import { expect, test } from '@playwright/test'

test.describe('Dashboard bancario', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: 'Acessar dashboard' }).click()
    await page.waitForURL('**/')
    await expect(page.getByRole('heading', { name: 'Painel de conta' })).toBeVisible()
  })

  test('abre dashboard e exibe saldo formatado', async ({ page }) => {
    const saldoPrincipal = page.getByRole('region', { name: /saldo disponivel na conta/i })
    await expect(saldoPrincipal).toContainText(/12\.450,90/)
  })

  test('simula transferencia e reflete feedback', async ({ page }) => {
    await expect(page.getByLabel('Destinatario')).toBeVisible({ timeout: 15_000 })
    await page.getByLabel('Destinatario').fill('Usuario E2E')
    await page.getByLabel('Valor').fill('10')
    await page.getByLabel('Descricao').fill('Teste automatizado')
    await page.getByRole('button', { name: 'Transferir agora' }).click()

    await expect(
      page.getByRole('status').filter({ hasText: /Usuario E2E/ }),
    ).toContainText(/Transferencia de R\$\s*10,00 enviada para Usuario E2E/i, {
      timeout: 20_000,
    })

    await expect(page.getByLabel('Resumo de saldo e sessao')).toContainText(/12\.440,90/)
  })

  test('encerra sessao e retorna ao login', async ({ page }) => {
    await page.getByRole('button', { name: 'Encerrar sessao' }).click()
    await expect(page.getByRole('heading', { name: 'Entrar na conta' })).toBeVisible()
  })
})
