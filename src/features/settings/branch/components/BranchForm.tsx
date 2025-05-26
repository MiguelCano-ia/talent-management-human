'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BranchOfOffice, branchOfOfficeSchema } from '../validations/branch.validations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useCreateBranch, useUpdateBranch } from '../hooks/useBranch'
import { useEffect } from 'react'
import { DialogClose } from '@/components/ui/dialog'

export function BranchForm({
  branch,
  onClose,
}: {
  branch?: BranchOfOffice
  onClose: () => void
}) {
  const form = useForm<BranchOfOffice>({
    resolver: zodResolver(branchOfOfficeSchema),
    defaultValues: {
      branchOfOffice: '',
      address: '',
      cityId: 0,
    },
  })

  const { register, handleSubmit, reset, formState } = form

  const createMutation = useCreateBranch()
  const updateMutation = useUpdateBranch()

  useEffect(() => {
    if (branch) reset(branch)
  }, [branch, reset])

  const onSubmit = (data: BranchOfOffice) => {
    if (branch?.branchOfOfficeId) {
      updateMutation.mutate(
        {
          branchOfOfficeId: branch.branchOfOfficeId,
          branchOfOffice: data.branchOfOffice,
          address: data.address,
          cityId: data.cityId,
        },
        { onSuccess: () => onClose() }
      )
    } else {
      createMutation.mutate(
        {
          branchOfOffice: data.branchOfOffice,
          address: data.address,
          cityId: data.cityId,
        },
        { onSuccess: () => onClose() }
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className='flex flex-col gap-2'>
        <Label htmlFor="branchOfOffice">Nombre</Label>
        <Input
          id="branchOfOffice"
          {...register('branchOfOffice')}
          placeholder="Nombre de la sucursal"
        />
        {formState.errors.branchOfOffice && (
          <p className="text-sm text-destructive">
            {formState.errors.branchOfOffice.message}
          </p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor="address">Dirección</Label>
        <Input
          id="address"
          {...register('address')}
          placeholder="Calle 123 #45-67"
        />
        {formState.errors.address && (
          <p className="text-sm text-destructive">{formState.errors.address.message}</p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor="cityId">Codigo Postal</Label>
        <Input
          id="cityId"
          type="number"
          {...register('cityId')}
          placeholder="123"
        />
        {formState.errors.cityId && (
          <p className="text-sm text-destructive">{formState.errors.cityId.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onClose} className='cursor-pointer'>
            Cancelar
          </Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
          className='cursor-pointer'
        >
          {branch?.branchOfOfficeId ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}
