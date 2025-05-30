'use client'

import { useState } from 'react'
import { EmployeeInput, employeeInputSchema } from '../validations/employee.validations'
import { useEmployees } from '../hooks/useEmployees'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Roles } from '@/features/auth/roles/roles.enum'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetRoles } from '@/features/auth/hooks/useGetRoles'

export function EmployeeList() {
  const [getFormData, setFormData] = useState<EmployeeInput>(

    {
      name: '',
      isVirtual: undefined,
      beforeDate: '',
      afterDate: '',
      personState: '',
      roleId: undefined,
    }
  );
  const { data, isLoading } = useEmployees(getFormData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<EmployeeInput>({
    resolver: zodResolver(employeeInputSchema),
    mode: "onChange",
  })

  const onSubmit = (data: EmployeeInput) => {
    setFormData(data)
  }

  const { data: roles = [] } = useGetRoles();

  return (
    <div className="max-w-7xl mx-auto mt-10 space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col m-10 gap-2">
        <div className='flex flex-row flex-wrap justify-between'>
          <div className="flex flex-col basis-sm">
            <div>
              <Label htmlFor="name" className="mb-2">
                Nombre
              </Label>
              <Input
                {...register("name")}
                id="name"
                placeholder="Ingrese su nombre"
                className='w-full'
                onChange={(e) => {
                  setValue("name", e.target.value);
                  clearErrors("name");
                }}
              />
              {errors.name && (
                <p className="text-destructive text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex  flex-col basis-sm">
            <Label htmlFor="roleId" className="mb-2">
              Rol
            </Label>
            <Select
              onValueChange={(val) => setValue("roleId", Number(val))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent id='roleId'>
                {roles.map((role) => {
                  return (
                    <SelectItem
                      key={role.roleId}
                      value={String(role.roleId)}
                    >
                      {role.role}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='flex justify-center items-center w-full'>
          <Button className="w-md p-2 bg-primary text-white hover:bg-primary/90 cursor-pointer w-full" type="submit" disabled={isLoading}>
            {isLoading ? "buscando..." : "Buscar"}
          </Button>
        </div>
      </form>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-primary">Personal</h2>
        <Link href="/auth/register">
          <Button className="bg-primary text-secondary cursor-pointer">Agregar personal</Button>
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
                  <td className="px-4 py-2">{emp.roleId === Roles.Administrativo ? "Administrador" : emp.roleId === Roles.Empleado ? "Empleado" : "Reclutador"}</td>
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
