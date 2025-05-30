import { useQuery } from '@tanstack/react-query'
import { getUnpayments } from '../services/payments.service'

export function useUnpayments() {
  return useQuery({
    queryKey: ['unpayments'],
    queryFn: getUnpayments,
    refetchOnWindowFocus: false,
  })
}