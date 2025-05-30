'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LogOut } from 'lucide-react'
import clsx from 'clsx'
import { signout } from '@/features/auth/actions/signout'
import { useActionState, startTransition } from 'react'

export function Sidebar() {
  const pathname = usePathname()
  const [, signOut] = useActionState(signout, null)
  
  const linkClasses = (path: string) =>
    clsx(
      'flex items-center gap-2 py-2 px-3 rounded-md transition-colors',
      pathname === path && 'bg-primary text-secondary font-semibold'
    )

  return (
    <aside className="w-64 bg-accent border-border hidden md:flex flex-col justify-between">
      <div>
        <div className="p-6 font-bold text-xl text-primary">RH Total</div>
        <nav className="flex flex-col gap-1 px-4">
          <Link href="/dashboard" className={linkClasses('/dashboard')}>
            <Home className="w-5 h-5" /> Inicio
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
