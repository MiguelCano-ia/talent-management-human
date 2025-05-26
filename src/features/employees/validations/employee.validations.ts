import { z } from 'zod'

export const employeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  identification: z.string(),
  isVirtual: z.boolean(),
  role: z.string(),
  status: z.string(),
  createdAt: z.string(),
})

export type Employee = z.infer<typeof employeeSchema>
