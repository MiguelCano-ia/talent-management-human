'use server'  

import { Employee, EmployeeInput } from '../validations/employee.validations'
import { APIAuth } from '@/config/authorization.api'

export const getEmployees = async (data: EmployeeInput): Promise<Employee[]> => {
  let filter = '';
  const keys: (keyof EmployeeInput)[] = Object.keys(data) as (keyof EmployeeInput)[];
  for (const key of keys) {
    const value = data[key];
    if (value !== undefined && value !== '') {
      if (filter) {
        filter += '&';
      }
      filter += `${key}=${encodeURIComponent(value)}`;
    }
  }
  filter = filter ? `?${filter}` : '';
  const response = await APIAuth.get(`user/filters${filter}`)
  if (!response.data) {
    return [];
  }
  return response.data
}
