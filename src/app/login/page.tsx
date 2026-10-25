"use client"

import { LogoLanceDev } from "@/components/my-components/LogoLanceDev"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/toast"
import { useAuth } from "@/contexts/authContext"
import useLogin from "@/hooks/useLogin"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Controller } from "react-hook-form"

export default function LoginPage() {
  const auth = useAuth()

  if (auth.token) {
    redirect('/')
  }

  const { control, isPending, handleSubmit, onSubmit, fillWithTestUser } = useLogin()


  return (
    <div className='flex flex-col justify-center items-center h-screen gap-5 px-4'>
      <div className='text-2xl'>
        <LogoLanceDev />
      </div>

      <Card className='flex flex-col items-center justify-center w-full md:w-1/3'>
        <CardHeader className='flex justify-center'>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <form id='login-form' onSubmit={handleSubmit(onSubmit)} className="w-full flex justify-center">
          <CardContent className='max-w-100 flex flex-col gap-3 w-full'>
            <Controller 
              name='email'
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor='email'>E-mail</Label>
                  <Input 
                    {...field}
                    id="email" 
                    aria-invalid={fieldState.invalid}
                    placeholder='E-mail'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller 
              name='password'
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor='password'>Senha</Label>
                  <Input 
                    {...field}
                    id="password" 
                    aria-invalid={fieldState.invalid}
                    placeholder='Senha'
                    type='password'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </CardContent>
        </form>
        
        <CardFooter className='flex flex-col gap-2'>
          <Button className='w-full' type='submit' form='login-form' disabled={isPending} >{!isPending ? 'Entrar' : 'Entrando..'}</Button>
          <div>
            Não possui uma conta?
            <Link className="text-accent font-bold" href={'register'}>{' '}Registrar</Link>
          </div>
        </CardFooter>
      </Card>

      <Card className='flex flex-col items-center justify-center w-full md:w-1/3'>
        <CardHeader className='flex justify-center w-full'>
          <CardTitle>Acesso rápido de teste</CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col gap-2 w-full'>
          <Button 
            onClick={() => fillWithTestUser('leiloeiro@leilodedev.com')}
          >
            Leiloeiro
          </Button>
          <Button 
            onClick={() => fillWithTestUser('licitante1@leilodedev.com')}
          >
            Cliente 1
          </Button>
          <Button 
            onClick={() => fillWithTestUser('licitante2@leilodedev.com')}
          >
            Cliente 2
          </Button>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  )
}