#!/usr/bin/env node
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const [, , command, ...args] = process.argv;

if (!command) {
  console.error("Usage: node scripts/run-tool.mjs <command> [...args]");
  process.exit(1);
}

function findLocalBin(cmd) {
  // Prefer project-local node_modules/.bin (relative to repository scripts directory)
  const binDir = path.resolve(__dirname, "..", "node_modules", ".bin");
  const candidates = [
    path.join(binDir, cmd),
    path.join(binDir, `${cmd}.js`),
    path.join(binDir, `${cmd}.cmd`),
    path.join(binDir, `${cmd}.ps1`),
    path.join(binDir, `${cmd}.exe`),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

const binPath = findLocalBin(command);
if (!binPath) {
  // No local binary found — report and skip (keeps parity with previous behavior)
  console.warn(
    `[skip] ${command} não executado: dependências não instaladas no ambiente atual.`,
  );
  process.exit(0);
}

const spawnOpts = { stdio: "inherit", shell: false };

let result;

try {
  const ext = path.extname(binPath).toLowerCase();

  if (process.platform === "win32") {
    // On Windows prefer running .cmd/.exe directly.
    if (ext === ".cmd" || ext === ".exe") {
      result = spawnSync(binPath, args, spawnOpts);
    } else if (ext === ".ps1") {
      // PowerShell script — invoke via PowerShell with execution policy bypass
      const pwsh = process.env.POWERSHELL || "powershell";
      result = spawnSync(
        pwsh,
        ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", binPath, ...args],
        spawnOpts,
      );
    } else if (ext === ".js") {
      // Node-running JS script
      result = spawnSync(process.execPath, [binPath, ...args], spawnOpts);
    } else {
      // Unknown extension (could be a unix shell script installed on Windows). Fall back to cmd.exe /c <path>
      const cmdExe = process.env.comspec || "cmd.exe";
      // Pass the path unquoted as a separate argv entry — spawnSync will pass it correctly to cmd.exe
      result = spawnSync(cmdExe, ["/c", binPath, ...args], spawnOpts);
    }

    // If the direct execution failed on Windows, try pnpm exec as a reliable fallback.
    // This handles cases where invoking the bin path directly fails due to shell/path peculiarities.
    if (result && typeof result.status === "number" && result.status !== 0) {
      console.warn(
        `[fallback] execução direta de ${command} falhou (status=${result.status}), tentando 'pnpm exec -- ${command}'...`,
      );
      const pnpmCmd = process.platform === "win32" ? "pnpm" : "pnpm";
      try {
        result = spawnSync(
          pnpmCmd,
          ["exec", "--", command, ...args],
          spawnOpts,
        );
      } catch (fallbackErr) {
        console.error(
          `[error] fallback 'pnpm exec' falhou:`,
          fallbackErr && fallbackErr.message
            ? fallbackErr.message
            : fallbackErr,
        );
      }
    }
  } else {
    // POSIX-like systems
    if (ext === ".js") {
      // Run JS bins with node to avoid relying on shebang handling across environments
      result = spawnSync(process.execPath, [binPath, ...args], spawnOpts);
    } else {
      // Execute the binary/script directly
      result = spawnSync(binPath, args, spawnOpts);
    }
  }
} catch (err) {
  console.error(
    `[error] falha ao executar ${command}:`,
    err && err.message ? err.message : err,
  );
  process.exit(1);
}

process.exit(result && typeof result.status === "number" ? result.status : 1);
