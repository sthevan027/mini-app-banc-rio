import { getAccountOverviewSnapshot, simulateRequest } from '../../../shared/api/mock-server'

export function fetchAccountOverview() {
  return simulateRequest(getAccountOverviewSnapshot())
}
