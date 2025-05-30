"use client"

import { useState } from "react"
import { useUploadContract } from "../hooks/useContracts"

export const ContractUploadForm = () => {
  const [file, setFile] = useState<File | null>(null)
  const upload = useUploadContract()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (file) upload.mutate(file)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 cursor-pointer">
      <label className="block font-medium">Subir contrato (.pdf)</label>
      <input
        type="file"
        accept="application/pdf"
        required
        onChange={e => setFile(e.target.files?.[0] || null)}
      />
      <button
        type="submit"
        disabled={upload.isPending}
        className="bg-primary text-white px-4 py-2 rounded ml-10 cursor-pointer"
      >
        {upload.isPending ? "Subiendo..." : "Subir contrato"}
      </button>
    </form>
  )
}
