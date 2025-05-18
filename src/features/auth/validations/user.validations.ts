import { z } from "zod"

export const createUserSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  lastName: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  phone: z.string().min(10, { message: "El teléfono debe tener al menos 10 caracteres" }),
  identification: z.string().min(6, { message: "La identificación no es válida" }),
  address: z.string().min(1, { message: "La dirección es requerida" }),
  account: z.string().min(1, { message: "La cuenta es requerida" }),
  roleId: z.number().min(1, { message: "El rol es requerido" }),
  branchId: z.number().min(1, { message: "La filial es requerida" }),
  statusId: z.number().min(1, { message: "El estado es requerido" }),
  paymentMethodId: z.number().min(1, { message: "El medio de pago es requerido" }),
  isVirtual: z.boolean(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
