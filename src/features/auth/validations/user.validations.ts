import { z } from "zod"

export const createUserSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  lastName: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres y una minuscula, una mayuscula, un caracter especial y un numero" }).regex(/[a-z]/).regex(/[A-Z]/).regex(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/).regex(/\d/),
  phone: z.string().min(10, { message: "El teléfono debe tener al menos 10 caracteres" }).max(3600000000),
  identification: z.string().min(6, { message: "La identificación no es válida" }),
  address: z.string().min(1, { message: "La dirección es requerida" }),
  acount: z.string().min(8, { message: "La cuenta debe tener al menos 8 caracteres" }).max(12, { message: "La cuenta debe tener máximo 12 caracteres" }).optional(),
  roleId: z.number().min(1, { message: "El rol es requerido" }),
  branchOficeId: z.number().min(1, { message: "La filial es requerida" }),
  meansOfPayment: z.number().min(1, { message: "El medio de pago es requerido" }),
  identificationId: z.number().min(1, { message: "El tipo de identificación es requerido" }),
  isVirtual: z.boolean(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
