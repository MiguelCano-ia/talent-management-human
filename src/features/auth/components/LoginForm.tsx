"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginInput } from "../validations/login.validations"
import { useLogin } from "../hooks/useLogin"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GoogleIcon } from "../icons/GoogleIcon"

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  })

  const loginMutation = useLogin()

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full mx-auto mt-20 space-y-6 bg-card p-8 rounded-lg shadow border border-border">
      <h2 className="text-2xl font-semibold text-center text-primary">Iniciar Sesión</h2>

      <div>
        <Label htmlFor="email" className="mb-2">Correo</Label>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="ejemplo@correo.com"
          onChange={(e) => {
            setValue("email", e.target.value)
            clearErrors("email")
          }}
        />
        {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password" className="mb-2">Contraseña</Label>
        <Input
          {...register("password")}
          id="password"
          type="password"
          placeholder="••••••••"
          onChange={(e) => {
            setValue("password", e.target.value)
            clearErrors("password")
          }}
        />
        {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
      </div>

      <Button className="w-full bg-primary text-white hover:bg-primary/90 cursor-pointer" type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Entrando..." : "Entrar"}
      </Button>

      <Separator />
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center cursor-pointer hover:bg-background/50"
        onClick={() => (window.location.href = "http://localhost:3000/api/v1/auth/google/login")}
      >
        <GoogleIcon />
        Ingresar con Google
      </Button>
    </form>
  )
}
