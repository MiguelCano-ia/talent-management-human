import Link from 'next/link'
import { Home, Users, FileText } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border hidden md:block">
      <div className="p-6 font-bold text-xl text-primary">Recursos Humanos</div>
      <nav className="flex flex-col gap-1 px-4">
        <Link href="/" className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-muted">
          <Home className="w-5 h-5" /> Inicio
        </Link>
        <Link href="/empleados" className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-muted">
          <Users className="w-5 h-5" /> Empleados
        </Link>
        <Link href="/contratos" className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-muted">
          <FileText className="w-5 h-5" /> Contratos
        </Link>
      </nav>
    </aside>
  )
}
