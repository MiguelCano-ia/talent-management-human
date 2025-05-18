"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useRegisterUser } from "../hooks/useRegisterUser"
import { CreateUserInput, createUserSchema } from "../validations/user.validations"

export function RegisterForm() {
  const [isVirtual, setIsVirtual] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      identification: "",
      address: "",
      account: "",
      roleId: 3,
      branchId: 1,
      statusId: 1,
      paymentMethodId: 1,
      isVirtual: false,
    },
    mode: "onChange",
  })

  const mutation = useRegisterUser()

  const onSubmit = (data: CreateUserInput) => {
    mutation.mutate({ ...data, isVirtual })
  }

  return (
    <Card className="max-w-3xl w-full mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-primary text-2xl font-bold text-center">Crear Usuario</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">
            <div>
              <Label htmlFor="name" className="mb-2">Nombre</Label>
              <Input {...register("name")} id="name" placeholder="Ingrese su nombre" onChange={(e) => {setValue("name", e.target.value); clearErrors("name")}} />
              {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="lastName" className="mb-2">Apellido</Label>
              <Input {...register("lastName")} id="lastName" placeholder="Ingrese su apellido" onChange={(e) => {setValue("lastName", e.target.value); clearErrors("lastName")}} />
              {errors.lastName && <p className="text-destructive text-sm">{errors.lastName.message}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="mb-2">Correo</Label>
              <Input {...register("email")} id="email" type="email" placeholder="Ingrese su correo" onChange={(e) => {setValue("email", e.target.value); clearErrors("email")}} />
              {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password" className="mb-2">Contraseña</Label>
              <Input {...register("password")} id="password" type="password" placeholder="Ingrese su contraseña" onChange={(e) => {setValue("password", e.target.value); clearErrors("password")}} />
              {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone" className="mb-2">Teléfono</Label>
              <Input {...register("phone")} id="phone" placeholder="Ingrese su teléfono" onChange={(e) => {setValue("phone", e.target.value); clearErrors("phone")}} />
              {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
            </div>
            <div>
              <Label htmlFor="identification" className="mb-2">Identificación</Label>
              <Input {...register("identification")} id="identification" placeholder="Ingrese su identificación" onChange={(e) => {setValue("identification", e.target.value); clearErrors("identification")}} />
              {errors.identification && <p className="text-destructive text-sm">{errors.identification.message}</p>}
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address" className="mb-2">Dirección</Label>
              <Input {...register("address")} id="address" placeholder="Ingrese su dirección" onChange={(e) => {setValue("address", e.target.value); clearErrors("address")}} />
              {errors.address && <p className="text-destructive text-sm">{errors.address.message}</p>}
            </div>
            <div>
              <Label htmlFor="account" className="mb-2">Cuenta Bancaria</Label>
              <Input {...register("account")} id="account" placeholder="Ingrese su cuenta bancaria" onChange={(e) => {setValue("account", e.target.value); clearErrors("account")}} />
              {errors.account && <p className="text-destructive text-sm">{errors.account.message}</p>}
            </div>
            <div>
              <Label htmlFor="roleId" className="mb-2">Rol</Label>
              <Select defaultValue="3" onValueChange={(val) => setValue("roleId", Number(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1" className="data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground transition-colors duration-100">Administrador</SelectItem>
                  <SelectItem value="2" className="data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground transition-colors duration-100">Elaborador</SelectItem>
                  <SelectItem value="3" className="data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground transition-colors duration-100">Colaborador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="branchId" className="mb-2">Filial</Label>
              <Select defaultValue="1" onValueChange={(val) => setValue("branchId", Number(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una filial" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1" className="data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground transition-colors duration-100">Sucursal 1</SelectItem>
                  <SelectItem value="2" className="data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground transition-colors duration-100">Sucursal 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="statusId" className="mb-2">Estado Persona</Label>
              <Select defaultValue="1" onValueChange={(val) => setValue("statusId", Number(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1" className="data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground transition-colors duration-100">Activo</SelectItem>
                  <SelectItem value="2" className="data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground transition-colors duration-100">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="paymentMethodId" className="mb-2">Medio de Pago</Label>
              <Select defaultValue="1" onValueChange={(val) => setValue("paymentMethodId", Number(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un medio de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1" className="data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground transition-colors duration-100">Transferencia</SelectItem>
                  <SelectItem value="2" className="data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground transition-colors duration-100">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-3 mt-2">
              <Switch id="isVirtual" checked={isVirtual} onCheckedChange={setIsVirtual} />
              <Label htmlFor="isVirtual" className="mb-2">¿Es virtual?</Label>
            </div>
          </div>
          <Separator />
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" className="cursor-pointer">Cancelar</Button>
            <Button type="submit" disabled={mutation.isPending} className="bg-primary text-white hover:bg-primary/90 cursor-pointer">
              {mutation.isPending ? "Creando..." : "Crear Usuario"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

