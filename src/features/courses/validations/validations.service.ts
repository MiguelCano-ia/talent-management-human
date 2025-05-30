import { z } from "zod"

export const courseSchema = z.object({
  educationId: z.string(),
  name: z.string(),
  startDate: z.string().datetime({ message: "Fecha inválida" }),
  endDate: z.string().datetime({ message: "Fecha inválida" }).optional(),
  habilities: z.array(z.number()),
})

export const habilitiesSchema = z.object({
  "habilityId": z.number().optional(),
  "name": z.string(),
  "weight": z.number()
})

export type Course = z.infer<typeof courseSchema>

export type Habilities = z.infer<typeof habilitiesSchema>