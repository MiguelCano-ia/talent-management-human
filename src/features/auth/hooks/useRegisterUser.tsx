import { useMutation } from "@tanstack/react-query"
import { createUser } from "../services/auth.service"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation";
export const useRegisterUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("Usuario creado correctamente")

      setTimeout(() => {
        router.replace("/dashboard"); 
      }, 2000); 
    },
    onError: (err: AxiosError) => {
      toast.error(err.response?.data as string || "Error al crear el usuario")
    },
  })
}
