'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Home, Users, FileText, Settings, CreditCard, DollarSign, Book, LogOut, Building2 } from 'lucide-react'
import clsx from 'clsx'
import { startTransition, useActionState } from 'react'
import { signout } from '@/features/auth/actions/signout'

export function Sidebar() {
  const [, signOut] = useActionState(signout, null)
  const pathname = usePathname()

  const linkClasses = (path: string) =>
    clsx(
      'flex items-center gap-2 py-2 px-3 rounded-md transition-colors',
      pathname === path && 'bg-primary text-secondary font-semibold'
    )

  return (

    <aside className="w-64 bg-accent border-r border-border hidden md:flex flex-col justify-between">
      <div>
        <div className="p-6 font-bold text-xl text-primary">RH Total</div>
        <nav className="flex flex-col gap-1 px-4">
          <Link href="/dashboard" className={linkClasses('/dashboard')}>
            <Home className="w-5 h-5" /> Inicio
          </Link>
          <Link href="/dashboard/employees" className={linkClasses('/dashboard/employees')}>
            <Users className="w-5 h-5" /> Personal
          </Link>
          <Link href="/dashboard/contracts" className={linkClasses('/dashboard/contracts')}>
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
          <Link href="/dashboard/courses" className={linkClasses('/dashboard/courses')}>
            <Book className="w-5 h-5" /> Cursos
          </Link>
          <Link href="/dashboard/configuration/companies" className={linkClasses('/dashboard/configuration/companies')}>
            <Building2 /> Compañias
          </Link>
        </nav>
      </div>
      <div className="px-4 py-4 border-t border-border">
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer" onClick={() => {
          startTransition(() => {
            signOut()
          })
        }}>
          <LogOut className="w-4 h-4" /> Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
