import { ContractTable } from "@/features/contracts/components/ContractTable"
import { ContractUploadForm } from "@/features/contracts/components/ContractUploadDialog"

export default function ContractsPage() {

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-primary">Contratos</h1>
      <ContractUploadForm />
      <ContractTable />
    </div>
  )
}
