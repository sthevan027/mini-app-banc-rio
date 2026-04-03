# Banc Rio Mini App

Mini app bancario frontend criado para o desafio tecnico com foco em organizacao, separacao de responsabilidades, UX basica consistente e clareza tecnica.

## Como rodar

```bash
pnpm install
pnpm dev
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm test:e2e
```

O primeiro uso dos testes E2E exige instalar o navegador do Playwright:

```bash
pnpm exec playwright install chromium
```

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 para UI
- React Router para roteamento
- Zustand para sessao e estado global de conta
- React Query para requests mockados e sincronizacao do cache
- React Hook Form + Zod para validacao da transferencia
- Vitest + Testing Library para testes de componente
- Playwright para E2E (dashboard, transferencia, logout)

## Estrutura

```text
src/
  app/
    providers/
    routes/
  components/
  features/
    auth/
    dashboard/
    transfer/
  services/
  store/
  test/
  utils/
  styles/
    tokens.css
```

## Fluxos implementados

- Login mock com persistencia de sessao via `zustand/persist`
- Dashboard com saldo e lista de transacoes vindos de API mockada
- Transferencia com validacao de formulario, erro de saldo insuficiente e feedback visual
- Atualizacao do estado global apos transferencia aprovada
- Loading state no carregamento inicial do dashboard

## Decisoes tecnicas

- `services/api.ts` centraliza a simulacao de requests com atraso artificial para manter a separacao entre UI e acesso a dados.
- React Query controla carregamento, erro e invalidacao de cache; Zustand guarda o snapshot global que a UI consome.
- O store de autenticacao e o store bancario foram separados para evitar acoplamento entre sessao e dominio financeiro.
- A pagina principal trabalha com componentes menores por responsabilidade: saldo, lista de transacoes e formulario.
- O visual foge do starter padrao e busca uma interface mais proxima de produto, com contraste alto e feedback claro.

## Teste implementado

O teste cobre o fluxo principal de transferencia:

- preencher destinatario, valor e descricao
- enviar o formulario
- validar feedback de sucesso
- confirmar atualizacao do saldo exibido

Execute com:

```bash
pnpm test
pnpm test:e2e
```

## Seguranca

Mesmo sendo um frontend mockado, as decisoes e cuidados esperados para um ambiente real estao descritos abaixo:

- Nenhuma regra de negocio sensivel deve ficar apenas no frontend; validacao final de saldo, permissao e antifraude precisa existir no backend.
- Tokens, chaves e endpoints privados nao devem ser hardcoded. Em producao, usar variaveis de ambiente e segredo gerenciado fora do bundle.
- O frontend deve trafegar somente em HTTPS para reduzir risco de interceptacao.
- Dados sensiveis nao devem ser persistidos em `localStorage` sem criterio. Aqui apenas a sessao mock foi persistida por simplicidade do desafio.
- Minificacao e obfuscacao do build ajudam contra engenharia reversa casual, mas nao substituem protecoes de backend.
- Logs e mensagens de erro nao devem expor identificadores internos, tokens ou dados pessoais.
- Validacoes de input no cliente melhoram UX, mas nunca substituem validacao no servidor.

## Melhorias futuras

- Integrar backend real com autenticacao JWT ou session cookies
- Adicionar toasts, skeletons mais ricos e filtros de transacoes
- Cobrir login e dashboard com testes adicionais
- Introduzir feature flags e ambiente `.env`
- Adicionar acessibilidade e internacionalizacao de forma mais abrangente
