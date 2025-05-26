import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getMeansOfPayments,
  createMeansOfPayment,
  updateMeansOfPayment,
} from '../services/means-of-payment.service'
import { toast } from 'sonner'

export function useMeansOfPayments() {
  return useQuery({
    queryKey: ['means-of-payment'],
    queryFn: getMeansOfPayments,
  })
}

export function useCreateMeansOfPayment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { meansOfPayment: string }) =>
      createMeansOfPayment(data),
    onSuccess: () => {
      toast.success('Medio de pago creado')
      queryClient.invalidateQueries({ queryKey: ['means-of-payment'] })
    },
    onError: () => toast.error('No se pudo crear el medio de pago'),
  })
}

export function useUpdateMeansOfPayment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      meansOfPaymentId,
      meansOfPayment,
    }: {
      meansOfPaymentId: number
      meansOfPayment: string
    }) => updateMeansOfPayment(meansOfPaymentId, { meansOfPayment }),
    onSuccess: () => {
      toast.success('Medio de pago actualizado')
      queryClient.invalidateQueries({ queryKey: ['means-of-payment'] })
    },
    onError: () => toast.error('No se pudo actualizar el medio de pago'),
  })
}
