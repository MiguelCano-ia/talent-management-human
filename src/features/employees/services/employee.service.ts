'use server'  

import { Employee } from '../validations/employee.validations'
import { APIAuth } from '@/config/authorization.api'

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await APIAuth.get('user/all')
  return response.data
}
