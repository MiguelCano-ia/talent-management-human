"use client"
import { useMutation } from "@tanstack/react-query"
import { postGeneratePayments } from "../services/payments.service"
import { toast } from "sonner"
export const useGeneratePayment = () => {
    return useMutation({
        mutationFn: postGeneratePayments,
        onSuccess: (data) => {
            toast.success("Pagos generados correctamente");
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'payments.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        },
        onError: (error) => {
            console.error("Error generating payments:", error);
            toast.error("Error al generar los pagos. Por favor, inténtalo de nuevo más tarde.");
        },
    })
}