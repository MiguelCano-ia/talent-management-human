"use client"

import { useContracts, useDeleteContract } from "../hooks/useContracts"
import { downloadContract } from "../services/contract.service"

export const ContractTable = () => {
  const { data, isLoading } = useContracts()
  const { mutate } = useDeleteContract()

  if (isLoading) return <p>Cargando contratos...</p>

  return (
    <>
    {
      data?.length === 0 ? (
        <p className="text-center text-2xl mt-10 font-bold">No hay contratos</p>
      ) : (
        <table className="w-full text-left border-collapse mt-6">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((file) => (
              <tr key={file.fileUserId} className="border-b">
                <td className="p-2">{file.nombre}</td>
                <td className="p-2 flex gap-2">
                  <a
                    onClick={() => downloadContract(file.fileId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Ver
                  </a>
                  <button
                    onClick={() => mutate(file.fileId)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
    </>
  )
}
