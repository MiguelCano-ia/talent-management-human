import { useMutation } from "@tanstack/react-query"
import { createUser } from "../services/auth.service"
import { toast } from "sonner"
import { AxiosError } from "axios"

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("Usuario creado correctamente")
    },
    onError: (err: AxiosError) => {
      toast.error(err.response?.data as string || "Error al crear el usuario")
    },
  })
}
