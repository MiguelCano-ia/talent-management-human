'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { useUnpayments } from '../hooks/useUnpayments'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import { useGeneratePayment } from '../hooks/useGeneratePayment'
import { toast } from 'sonner'
import { useState } from 'react'
import { useMeansOfPayments } from '@/features/settings/payment/hooks/useMeansOfPayment'
import { useUnpaymentsByUserId } from '../hooks/useUpaymentByUserId'

export function UnpaymentsTable() {
    const [getUserId, setUserId] = useState<number | null>(null);
    const { data: unpayments, isLoading, refetch } = useUnpayments();
    const { data: meansOfPayments } = useMeansOfPayments();
    const { data: unpaymentsByUserId, isLoading: isLoadingByUserId } = useUnpaymentsByUserId(getUserId);
    const mutation = useGeneratePayment();
    const handleGeneratePayments = (e: any) => {
        e.preventDefault();
        if (unpayments && unpayments.length > 0) {
            mutation.mutate(unpayments.map(i => String(i.userId)), {
                onSuccess: () => {
                    toast.success("Pagos generados correctamente");
                    refetch();
                },
            });
        } else {
            toast.warning("No hay pagos pendientes para generar.");
        }
    }
    const showDetails = (data: number | null) => {
        return (e: React.MouseEvent<HTMLButtonElement>) => {
            if (getUserId !== data) {
                console.log("showDetails", data);
                setUserId(data);
            }
        };
    }
    return (
        <div className="max-w-7xl mx-auto mt-10 space-y-6">
            <div className='flex justify-end'>
                <Button className='' onClick={handleGeneratePayments} disabled={isLoading}>
                    Pagar todo
                </Button>
            </div>
            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full rounded-md" />
                    ))}
                </div>
            ) : (
                <section className="w-full">
                    <div className="flex justify-around items-center border-2 rounded-xs bg-[#f4f4f5]">
                        <div className='basis-1/12'>
                        </div>
                        <div className='basis-11/12 flex items-center justify-between'>
                            <p className="px-4 py-2">Id</p>
                            <p className="px-4 py-2">Nombre</p>
                            <p className="px-4 py-2">Identificación</p>
                            <p className="px-4 py-2">Maximo Pago</p>
                            <p className="px-4 py-2">N. Faltas</p>
                            <p className="px-4 py-2">N. Novedades</p>
                        </div>
                    </div>
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full border-2"
                        onValueChange={(value) => {
                            if (value) {
                                setUserId(Number(value));
                                return;
                            }
                            setUserId(null);
                        }}
                    >
                        {unpayments?.map((unpayment) => {
                            return (
                                <AccordionItem key={uuidv4()} value={String(unpayment.userId)}>
                                    <AccordionTrigger className='flex flex-row-reverse'>
                                        <div className='basis-11/12 flex'>
                                            <p className="ml-4">{unpayment.userId}</p>
                                            <p className="ml-16">{unpayment.name}</p>
                                            <p className="ml-17">{unpayment.identificacion}</p>
                                            <p className="ml-45">{Math.min(...unpayment.payDay)}</p>
                                            <p className="ml-45">{unpayment.faults?.length || 0}</p>
                                            <p className="ml-45">{unpayment.novelties?.length || 0}</p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {(isLoading || isLoadingByUserId) ? (
                                            <div className="space-y-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Skeleton key={i} className="h-10 w-full rounded-md" />
                                                ))}
                                            </div>
                                        ) : (

                                            <div className='flex flex-col'>
                                                <table className="min-w-full text-sm text-left">
                                                    <thead className="bg-muted">
                                                        <tr>
                                                            <th className="px-4 py-2">medio de pago</th>
                                                            <th className="px-4 py-2">salario</th>
                                                            <th className="px-4 py-2">id contrato</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <>
                                                            {getUserId == unpayment.userId && unpaymentsByUserId?.map((userUnpayment) => (
                                                                <tr key={uuidv4()}>
                                                                    <td className="px-4 py-2">
                                                                        {meansOfPayments?.find(i => i.meansOfPaymentId == userUnpayment.meansOfPaymentId)?.meansOfPayment || 'No definido'}
                                                                    </td>
                                                                    <td className="px-4 py-2">{userUnpayment.salary}</td>
                                                                    <td className="px-4 py-2">{userUnpayment.contractId || "no hay contrato"}</td>
                                                                </tr>
                                                            ))}
                                                        </>
                                                    </tbody>
                                                </table>
                                            </div>)}
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </section>
            )}
        </div>
    )
}
