import { z } from "zod"

export const courseSchema = z.object({
  educationId: z.string().optional(),
  name: z.string().optional(),
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
  habilities: z.array(z.any()).optional(),
})

export const habilitiesSchema = z.object({
  "habilityId": z.number().optional(),
  "name": z.string(),
  "weight": z.number()
})

export type Course = z.infer<typeof courseSchema>

export type Habilities = z.infer<typeof habilitiesSchema>