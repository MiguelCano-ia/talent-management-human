'use client'

import { useMeansOfPayments } from '../hooks/useMeansOfPayment'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import { MeansOfPayment } from '../validations/means-of-payment.validations'
import { MeansOfPaymentForm } from './MeansOfPaymentForm'
import { Pencil } from 'lucide-react'

export function MeansOfPaymentList() {
  const { data, isLoading } = useMeansOfPayments()
  const [selected, setSelected] = useState<MeansOfPayment | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Medios de Pago</h2>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setSelected(null)
                setIsCreateOpen(true)
              }} 
              className="cursor-pointer"
            >
              Agregar medio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-xl text-primary">Agregar medio de pago</DialogTitle>
            <DialogDescription></DialogDescription>
            <MeansOfPaymentForm 
              payment={selected!} 
              onClose={() => {
                setIsCreateOpen(false)
                setSelected(null)
              }} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="border rounded-md overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item.meansOfPaymentId} className="border-t">
                  <td className="px-4 py-2">{item.meansOfPaymentId}</td>
                  <td className="px-4 py-2">{item.meansOfPayment}</td>
                  <td className="px-4 py-2">
                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelected(item)
                            setIsEditOpen(true)
                          }}
                        >
                          <Pencil className="w-4 h-4 mr-1 cursor-pointer" />
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle className="text-xl text-primary">Editar medio de pago</DialogTitle>
                        <DialogDescription></DialogDescription>
                        <MeansOfPaymentForm 
                          payment={selected!} 
                          onClose={() => {
                            setIsEditOpen(false)
                            setSelected(null)
                          }} 
                        />
                      </DialogContent>
                    </Dialog>
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
