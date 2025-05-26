'use server'

import { API } from '@/config/api'
import { Employee } from '../validations/employee.validations'

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await API.get('user/all')
  return response.data
}
