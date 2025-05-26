"use server"

import { BranchOfOffice } from "@/features/auth/interfaces/branchOfOffice.interface"
import { API } from "@/config/api"

export const getBranches = async (): Promise<BranchOfOffice[]> => {
  const res = await API.get("generic/branchOfOffice")
  return res.data
}

export const createBranch = async (data: {
  branchOfOffice: string
  address: string
  cityId: number
}) => {
  const res = await API.post("generic/branchOfOffice", {
    name: data.branchOfOffice,
    address: data.address,
    cityId: data.cityId.toString(),
  })
  return res.data
}

export const updateBranch = async (
  id: number,
  data: { branchOfOffice: string; address: string; cityId: number }
) => {
  const res = await API.put(`generic/branchOfOffice/${id}`, {
    name: data.branchOfOffice,
    address: data.address,
    cityId: data.cityId.toString(),
  })
  return res.data
} 