'use client'

import { useEmployees } from '../hooks/useEmployees'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export function EmployeeList() {
  const { data, isLoading } = useEmployees()

  return (
    <div className="max-w-7xl mx-auto mt-10 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-primary">Empleados</h2>
        <Link href="/auth/register">
          <Button className="bg-primary text-secondary cursor-pointer">Agregar empleado</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <div className="border rounded-md overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Identificación</th>
                <th className="px-4 py-2">Rol</th>
                <th className="px-4 py-2">Virtual</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((emp, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2">{emp.phone}</td>
                  <td className="px-4 py-2">{emp.identification}</td>
                  <td className="px-4 py-2">{emp.roleId === 4 ? "Administrador" : emp.roleId === 3 ? "Empleado" : "Reclutador"}</td>
                  <td className="px-4 py-2">
                    {emp.isVirtual ? 'Sí' : 'No'}
                  </td>
                  <td className="px-4 py-2">
                    <Button size="sm" variant="outline">Ver</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
