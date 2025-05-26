import { useMutation } from "@tanstack/react-query"
import { login } from "../services/auth.service"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"

export const useLogin = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Has iniciado sesión correctamente")
      setTimeout(() => {
        router.replace("/dashboard")
      }, 1000)
    },
    onError: (axiosError: AxiosError) => {
      toast.error(axiosError?.response?.data as string || "Error al iniciar sesión")
    },
  })
}
