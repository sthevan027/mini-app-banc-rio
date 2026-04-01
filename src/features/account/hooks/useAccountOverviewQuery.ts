import { useQuery } from '@tanstack/react-query'
import { accountKeys } from '../api/accountKeys'
import { fetchAccountOverview } from '../api/fetchAccountOverview'

export function useAccountOverviewQuery() {
  return useQuery({
    queryKey: accountKeys.overview(),
    queryFn: fetchAccountOverview,
  })
}
