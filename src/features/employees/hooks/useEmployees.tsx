import { useQuery } from '@tanstack/react-query'
import { getEmployees } from '../services/employee.service'
import { EmployeeInput } from '../validations/employee.validations'

export function useEmployees(data: EmployeeInput) {
  return useQuery({
    queryKey: ['employeesFilters', data],
    queryFn: ()=> getEmployees(data),
    
  })
}
