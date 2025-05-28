'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home } from 'lucide-react'
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
      </nav>
    </aside>  
  )
}
