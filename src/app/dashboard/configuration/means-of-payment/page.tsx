import { MeansOfPaymentList } from "@/features/settings/payment/components/MeansOfPaymentList";

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-primary">Gestión de Medios de Pago</h1>
      <MeansOfPaymentList
       />
    </>
  );
}