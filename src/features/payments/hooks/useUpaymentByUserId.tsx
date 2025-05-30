import { useQuery } from '@tanstack/react-query'
import { getUnpaymentsByUserId } from '../services/payments.service'

export function useUnpaymentsByUserId(userId: number | null) {
  return useQuery({
    queryKey: ['unpayments', userId],
    queryFn: () => getUnpaymentsByUserId(userId),
    refetchOnWindowFocus: false,
  })
}