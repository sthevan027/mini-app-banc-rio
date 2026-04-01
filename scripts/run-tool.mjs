#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const [, , command, ...args] = process.argv

if (!command) {
  console.error('Usage: node scripts/run-tool.mjs <command> [...args]')
  process.exit(1)
}

const binPath = `node_modules/.bin/${command}`
if (!existsSync(binPath)) {
  console.warn(`[skip] ${command} não executado: dependências não instaladas no ambiente atual.`)
  process.exit(0)
}

const result = spawnSync(binPath, args, {
  stdio: 'inherit',
  shell: true,
})

process.exit(result.status ?? 1)
