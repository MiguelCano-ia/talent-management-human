import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  getCompanies,
  addCompany,
  deleteCompany
} from "./../service/company.service"
import { toast } from "sonner"

export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  })
}

export function useCreateCompany() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addCompany,
    onSuccess: () => {
      toast.success("Compañia creada")
      queryClient.invalidateQueries({ queryKey: ["companies"] })
    },
    onError: () => toast.error("No se pudo crear la sucursal"),
  })
}

export function useDeleteCompany() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (companyId: string) => {
      if (companyId === "683a1c572bdbe34086648a05") {
        toast.error("No se puede eliminar la compañia por defecto")
        return Promise.reject("No se puede eliminar la compañia por defecto")
      }
      return deleteCompany(companyId);
    },
    onSuccess: () => {
      toast.success("Compañia eliminada")
      queryClient.invalidateQueries({ queryKey: ["companies"] })
    },
    onError: () => toast.error("No se pudo eliminar la compañia"),
  })
}

// export function useUpdateBranch() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: ({
//       branchOfOfficeId,
//       branchOfOffice,
//       address,
//       cityId,
//     }: {
//       branchOfOfficeId: number
//       branchOfOffice: string
//       address: string
//       cityId: number
//     }) =>
//       updateBranch(branchOfOfficeId, {
//         branchOfOffice,
//         address,
//         cityId,
//       }),
//     onSuccess: () => {
//       toast.success("Sucursal actualizada")
//       queryClient.invalidateQueries({ queryKey: ["branches"] })
//     },
//     onError: () => toast.error("No se pudo actualizar la sucursal"),
//   })
// }
