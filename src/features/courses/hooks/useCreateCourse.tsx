import { useMutation } from "@tanstack/react-query"
import { postCourse } from "../services/course.service";
import { toast } from "sonner"
import { AxiosError } from "axios"

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: postCourse,
    onSuccess: () => {
      toast.success("Curso creado correctamente")
    },
    onError: (err: AxiosError) => {
      toast.error(err.response?.data as string || "Error al crear el curso")
    },
  })
}
