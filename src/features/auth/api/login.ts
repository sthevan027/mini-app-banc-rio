import type { LoginPayload, UserSession } from '../../../entities/auth/types'
import { simulateRequest } from '../../../shared/api/mock-server'

export async function loginRequest(payload: LoginPayload): Promise<UserSession> {
  const trimmedName = payload.name.trim()
  const trimmedEmail = payload.email.trim()

  if (!trimmedName || !trimmedEmail) {
    throw new Error('Preencha nome e email para continuar.')
  }

  return simulateRequest({
    id: 'usr-banc-rio',
    name: trimmedName,
    email: trimmedEmail,
  })
}
