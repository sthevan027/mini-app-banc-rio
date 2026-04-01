export type UserSession = {
  id: string
  name: string
  email: string
}

export type LoginPayload = Pick<UserSession, 'name' | 'email'>
