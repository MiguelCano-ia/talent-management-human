import { Sidebar } from '@/shared/components/sidebar/SideBar'
import { Header } from '@/shared/components/header/Header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  )
}
