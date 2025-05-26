import { z } from 'zod'

export const meansOfPaymentSchema = z.object({
  meansOfPaymentId: z.number().optional(),
  meansOfPayment: z.string().min(2, 'El nombre es obligatorio'),
})

export type MeansOfPayment = z.infer<typeof meansOfPaymentSchema>
