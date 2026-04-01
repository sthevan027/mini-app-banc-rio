import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AccountOverview } from '../../../entities/account/types'
import { accountKeys } from '../../account/api/accountKeys'
import { transferFunds } from '../api/transferFunds'

export function useTransferMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: transferFunds,
    onSuccess: (result) => {
      queryClient.setQueryData<AccountOverview>(
        accountKeys.overview(),
        (current) => {
          if (!current) {
            return current
          }

          return {
            balance: result.balance,
            transactions: [result.transaction, ...current.transactions],
          }
        },
      )
    },
  })
}
