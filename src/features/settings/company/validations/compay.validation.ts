import { z } from "zod"

export const companySchema = z.object({
  companyId: z.string().optional(),
  company: z.string().min(1, "El nombre de la empresa es obligatorio"),
  email: z.string().email("El correo electrónico debe ser válido"),
})

export type Company = z.infer<typeof companySchema>