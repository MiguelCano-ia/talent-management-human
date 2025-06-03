'use client'

import { useCompanies, useDeleteCompany, useCreateCompany } from '../hooks/useCompany'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuid } from 'uuid'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { BranchOfOffice } from '@/features/auth/interfaces/branchOfOffice.interface'
import { Skeleton } from '@/components/ui/skeleton'
import { Company, companySchema } from '../validations/compay.validation'

export function CreateCompanyDialog({ }) {
    const [open, setOpen] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Company>({
        resolver: zodResolver(companySchema),
        mode: "onChange",
    })

    const mutation = useCreateCompany()
    console.log(errors);
    const onSubmit = (data: Company) => {
        mutation.mutate(data);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-fit">
                    <Pencil className="mr-2" />
                    Crear Compañia
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Crear Compañia</DialogTitle>
                <DialogDescription>
                    Completa los campos para crear una nueva compañia.
                </DialogDescription>
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="name" className="mb-2">
                            Nombre
                        </Label>
                        <Input
                            {...register("company")}
                            id="name"
                            placeholder="Ingrese el nombre de la compañia"
                            className='w-full'
                            onChange={(e) => {
                                setValue("company", e.target.value);
                                clearErrors("company");
                            }}
                        />
                        {errors.company && (
                            <p className="text-destructive text-sm">
                                {errors.company.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="email" className="mb-2">
                            Email
                        </Label>
                        <Input
                            {...register("email")}
                            id="email"
                            placeholder="Ingresa el email de la compañia"
                            className='w-full'
                            onChange={(e) => {
                                setValue("email", e.target.value);
                                clearErrors("email");
                            }}
                        />
                        {errors.email && (
                            <p className="text-destructive text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </form>
                <Button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    disabled={mutation.isPending}
                    className="bg-primary text-white hover:bg-primary/90 cursor-pointer"
                >
                    {mutation.isPending ? "Creando..." : "Crear Compañia"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export function CompaniesTable() {
    const { data: companies, isLoading } = useCompanies()

    const mutation = useDeleteCompany();

    return (
        <div className="max-w-4xl mx-auto mt-10 space-y-6">
            <div className="flex justify-between items-center mb-4">
                <CreateCompanyDialog />
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
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2"><Trash2 /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies?.map((company) => (
                                <tr key={uuid()} className="border-t">
                                    <td className="px-4 py-2">{company.company}</td>
                                    <td className="px-4 py-2">{company.email}</td>
                                    <td className="px-4 py-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="w-fit text-red-500 hover:bg-red-100"
                                            onClick={() => mutation.mutate(company.companyId || "")}>
                                            Eliminar
                                        </Button>
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
