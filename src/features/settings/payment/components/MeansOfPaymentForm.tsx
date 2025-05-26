'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MeansOfPayment, meansOfPaymentSchema } from '../validations/means-of-payment.validations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  useCreateMeansOfPayment,
  useUpdateMeansOfPayment,
} from '../hooks/useMeansOfPayment'
import { useEffect } from 'react'
import { DialogClose } from '@/components/ui/dialog'

export function MeansOfPaymentForm({
  payment,
  onClose,
}: {
  payment?: MeansOfPayment
  onClose: () => void
}) {
  const form = useForm<MeansOfPayment>({
    resolver: zodResolver(meansOfPaymentSchema),
    defaultValues: {
      meansOfPayment: '',
    },
  })

  const { register, handleSubmit, reset, formState } = form

  const create = useCreateMeansOfPayment()
  const update = useUpdateMeansOfPayment()

  useEffect(() => {
    if (payment) reset(payment)
  }, [payment, reset])

  const onSubmit = (data: MeansOfPayment) => {
    if (payment?.meansOfPaymentId) {
      update.mutate(
        { meansOfPaymentId: payment.meansOfPaymentId, meansOfPayment: data.meansOfPayment },
        { onSuccess: () => onClose() }
      )
    } else {
      create.mutate(
        { meansOfPayment: data.meansOfPayment },
        { onSuccess: () => onClose() }
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="meansOfPayment">Nombre</Label>
        <Input
          id="meansOfPayment"
          {...register('meansOfPayment')}
          placeholder="Ej: Cuenta Ahorro Bancolombia"
        />
        {formState.errors.meansOfPayment && (
          <p className="text-sm text-destructive">
            {formState.errors.meansOfPayment.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">
            Cancelar
          </Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={create.isPending || update.isPending}
          className="cursor-pointer"
        >
          {payment?.meansOfPaymentId ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}
