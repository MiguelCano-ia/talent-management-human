'use client'

import { useBranches } from '../hooks/useBranch'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import { BranchForm } from './BranchForm'
import { Pencil } from 'lucide-react'
import { BranchOfOffice } from '@/features/auth/interfaces/branchOfOffice.interface'

export function BranchList() {
  const { data: branches, isLoading } = useBranches()
  const [selected, setSelected] = useState<BranchOfOffice | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Sucursales</h2>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className='cursor-pointer'>Agregar sucursal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className='text-xl text-primary'>Agregar sucursal</DialogTitle>
            <DialogDescription>
            </DialogDescription>
            <BranchForm onClose={() => {
              setIsCreateOpen(false)
              setSelected(null)
            }} />
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
                <th className="px-4 py-2">Dirección</th>
                <th className="px-4 py-2">Código postal</th>
                <th className="px-4 py-2">Editar</th>
              </tr>
            </thead>
            <tbody>
              {branches?.map((branch) => (
                <tr key={branch.branchOfOfficeId} className="border-t">
                  <td className="px-4 py-2">{branch.branchOfOfficeId}</td>
                  <td className="px-4 py-2">{branch.branchOfOffice}</td>
                  <td className="px-4 py-2">{branch.address}</td>
                  <td className="px-4 py-2">{branch.cityId}</td>
                  <td className="px-4 py-2">
                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className='cursor-pointer'
                          onClick={() => {
                            setSelected(branch)
                            setIsEditOpen(true)
                          }}
                        >
                          <Pencil className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle className='text-xl text-primary'>Editar sucursal</DialogTitle>
                        <DialogDescription></DialogDescription>
                        <BranchForm 
                          branch={selected!} 
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
