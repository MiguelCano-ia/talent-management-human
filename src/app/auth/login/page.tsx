import { LoginForm } from "@/features/auth/components/LoginForm"

export default async function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 xl:w-2/3 bg-primary  items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-center text-white">Bienvenido a RH Total, tu mejor aliado en recursos humanos</h1>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-card text-card-foreground p-8 h-dvh">
        <LoginForm />
      </div>
    </main>
  )
}
