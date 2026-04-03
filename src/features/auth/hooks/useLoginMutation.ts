import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '../api/login'
import { useAuthStore } from '../../../store/auth-store'

export function useLoginMutation() {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (user) => {
      login(user)
      void navigate('/')
    },
  })
}
