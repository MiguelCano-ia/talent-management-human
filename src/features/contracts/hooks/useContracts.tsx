import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getContracts, uploadContract, deleteContract } from "../services/contract.service"
import { toast } from "sonner"

export const useContracts = () => {
  return useQuery({
    queryKey: ["contracts"],
    queryFn: getContracts,
  })
}

export const useUploadContract = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: uploadContract,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contracts"] }),
    onError: () => {
      toast.error("Error al subir el contrato")
    },
  })
}

export const useDeleteContract = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteContract,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contracts"] }),
    onError: () => {
      toast.error("Error al eliminar el contrato")
    },
  })
}
