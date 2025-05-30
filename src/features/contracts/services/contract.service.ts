"use server";

import { ContractFile } from "../interfaces/types"
import { APIAuth } from "@/config/authorization.api"
import { APIAuthFile } from "@/config/file"


export const getContracts = async (): Promise<ContractFile[]> => {
  const response = await APIAuth<ContractFile[]>("user/files/userFiles")
  const contracts = response.data.filter((file: ContractFile) => file.fileTypeId === 6) 
  return contracts
}

export const uploadContract = async (file: File) => {  
  const formData = new FormData()
  formData.append("fileTypeId", "6")
  formData.append("file", file)
  
  const response = await APIAuthFile.post(`user/upload/${new Date().getTime()}`, formData)
  return response
 
}

export const downloadContract = async (fileId: string) => {
  try {
    const response = await APIAuthFile.get(`files/${fileId}`, {
      responseType: 'blob'
    })
    
    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    
    window.open(url, '_blank')
    
    return response
  } catch (error) {
    console.error('Error downloading file:', error)
    throw error
  }
}

export const deleteContract = async (fileId: string) => {
  return APIAuth.delete(`user/files/${fileId}`)
}
