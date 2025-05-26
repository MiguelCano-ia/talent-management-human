import { EmployeeList } from '@/features/employees/components/EmployeeList'

export default function EmpleadosPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-primary">Gestión de Empleados</h1>
      <EmployeeList />
    </>
  )
}
