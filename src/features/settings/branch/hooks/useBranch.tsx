import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createBranch,
  getBranches,
  updateBranch,
} from "../services/branch.service"
import { toast } from "sonner"

export function useBranches() {
  return useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,
  })
}

export function useCreateBranch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      branchOfOffice: string
      address: string
      cityId: number
    }) => createBranch(data),
    onSuccess: () => {
      toast.success("Sucursal creada")
      queryClient.invalidateQueries({ queryKey: ["branches"] })
    },
    onError: () => toast.error("No se pudo crear la sucursal"),
  })
}

export function useUpdateBranch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      branchOfOfficeId,
      branchOfOffice,
      address,
      cityId,
    }: {
      branchOfOfficeId: number
      branchOfOffice: string
      address: string
      cityId: number
    }) =>
      updateBranch(branchOfOfficeId, {
        branchOfOffice,
        address,
        cityId,
      }),
    onSuccess: () => {
      toast.success("Sucursal actualizada")
      queryClient.invalidateQueries({ queryKey: ["branches"] })
    },
    onError: () => toast.error("No se pudo actualizar la sucursal"),
  })
}
