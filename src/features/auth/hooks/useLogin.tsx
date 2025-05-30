import { useMutation } from "@tanstack/react-query"
import { login } from "../services/auth.service"
import { toast } from "sonner"
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
    onError: () => {
      toast.error("Error al iniciar sesión, revise sus credenciales")
    },
  })
}
