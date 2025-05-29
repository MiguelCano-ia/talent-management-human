import { z } from 'zod'

export const employeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  identification: z.string(),
  isVirtual: z.boolean(),
  roleId: z.number(),
  status: z.string(),
  createdAt: z.string(),
})

export const employeeInputSchema = z.object({
  name: z.string().optional(),
  isVirtual: z.boolean().optional(),
  beforeDate: z.string().optional(),
  afterDate: z.string().optional(),
  personState: z.string().optional(),
  roleId: z.number().optional(),
})

export type Employee = z.infer<typeof employeeSchema>

export type EmployeeInput = z.infer<typeof employeeInputSchema>