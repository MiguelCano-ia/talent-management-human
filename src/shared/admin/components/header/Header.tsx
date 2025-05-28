import { ThemeToggle } from '@/shared/theme/theme-toggle'

export function Header() {
  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-foreground">Panel administrativo</h1>
      <ThemeToggle />
    </header>
  )
}
