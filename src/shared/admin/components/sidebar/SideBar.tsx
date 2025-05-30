'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, FileText, Settings, CreditCard, DollarSign, Book } from 'lucide-react'
import clsx from 'clsx'

export function Sidebar() {
  const pathname = usePathname()

  const linkClasses = (path: string) =>
    clsx(
      'flex items-center gap-2 py-2 px-3 rounded-md transition-colors',
      pathname === path && 'bg-primary text-secondary font-semibold'
    )

  return (
    <aside className="w-64 bg-card border-r border-border hidden md:block">
      <div className="p-6 font-bold text-xl text-primary">Recursos Humanos</div>
      <nav className="flex flex-col gap-1 px-4">
        <Link href="/dashboard" className={linkClasses('/dashboard')}>
          <Home className="w-5 h-5" /> Inicio
        </Link>
        <Link href="/dashboard/employees" className={linkClasses('/dashboard/employees')}>
          <Users className="w-5 h-5" /> Empleados
        </Link>
        <Link href="/dashboard/contratos" className={linkClasses('/dashboard/contratos')}>
          <FileText className="w-5 h-5" /> Contratos
        </Link>
        <Link href="/dashboard/configuration/branches" className={linkClasses('/dashboard/configuration/branches')}>
          <Settings className="w-5 h-5" /> Sucursales
        </Link>
        <Link
          href="/dashboard/configuration/means-of-payment"
          className={linkClasses('/dashboard/configuration/means-of-payment')}
        >
          <CreditCard className="w-5 h-5" /> Medios de Pago
        </Link>
        <Link
          href="/dashboard/payments"
          className={linkClasses('/dashboard/payments')}
        >
          <DollarSign className='w-5 h-5' /> Pagos
        </Link>
        <Link href="/dashboard/courses" className={linkClasses('/dashboard/configuration')}>
          <Book className="w-5 h-5" /> Cursos
        </Link>
      </nav>
    </aside>
  )
}
