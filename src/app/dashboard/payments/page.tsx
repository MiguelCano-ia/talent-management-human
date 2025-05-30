import { EmployeeList } from '@/features/employees/components/EmployeeList'
import { UnpaymentsTable } from '@/features/payments/components/unpaymentsTable'

export default function EmpleadosPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-primary">Gestión de contratos</h1>
      <UnpaymentsTable />
    </>
  )
}