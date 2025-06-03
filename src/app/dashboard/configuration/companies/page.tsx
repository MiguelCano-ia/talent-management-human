import { CompaniesTable } from "@/features/settings/company/components/companiesTable";

export default function ComapyPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-6 text-primary">Gestión de compañias</h1>
            <CompaniesTable
            />
        </>
    );
}