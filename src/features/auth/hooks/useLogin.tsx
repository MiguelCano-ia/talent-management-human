import { useMutation } from "@tanstack/react-query"
import { login } from "../services/auth.service"
import { toast } from "sonner"
import { AxiosError } from "axios"

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Has iniciado sesión correctamente")
      // redirigir al dashboard si quieres
    },
    onError: (axiosError: AxiosError) => {
      toast.error(axiosError?.response?.data as string || "Error al iniciar sesión")
    },
  })
}
