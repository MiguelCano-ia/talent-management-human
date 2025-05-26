import { z } from "zod"

export const branchOfOfficeSchema = z.object({
  branchOfOfficeId: z.number().optional(),
  branchOfOffice: z.string().min(2, "El nombre es obligatorio"),
  address: z.string().min(2, "La dirección es obligatoria"),
  cityId: z.coerce.number().min(1, "El id de la ciudad es obligatorio"),
})

export type BranchOfOffice = z.infer<typeof branchOfOfficeSchema>