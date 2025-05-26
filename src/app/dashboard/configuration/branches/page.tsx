import { BranchList } from "@/features/settings/branch/components/BranchList"


export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-primary">Gestión de Sucursales</h1>
      <BranchList />
     </>
  );
}