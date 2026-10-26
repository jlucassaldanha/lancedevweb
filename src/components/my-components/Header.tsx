"use client"

import Link from "next/link";
import { LogoLanceDev } from "./LogoLanceDev";
import { Button, buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { ThemeButton } from "./ThemeButton";
import { useAuth } from "@/contexts/authContext";
import { logoutAction } from "@/actions/auth";

export function Header() {
  const pathName = usePathname()

  const auth = useAuth()

  const accountLink = auth.user?.role === "LICITANTE" ? "/dashboard/licitante": "/dashboard/leiloeiro"

  if (pathName === '/login' || pathName === '/register') {
    return null            
  }

  const user = auth.user

  return (
    <div className="flex flex-col md:flex-row border-b border-border/40 justify-between md:items-center mb-4 px-4 md:px-10 py-6 gap-2">
      <Link href={'/'}>
        <div className='text-3xl'>
          <LogoLanceDev />
        </div>
      </Link>

      <div className="flex gap-2">
        {user ? (
          <div className='flex justify-center items-center'>
            <Link href={accountLink}>
              <span className='font-bold'>Olá, {user?.name}</span>
            </Link>

            <Button onClick={logoutAction} className='ml-4'>
              Sair
            </Button>
          </div>
        ) : (
          <div className="flex gap-2"> 
            <Link href={'/login'} className={buttonVariants()}>
              Entrar
            </Link>

            <Link href={'/register'} className={buttonVariants({ variant: 'secondary' })}>
              Criar Conta
            </Link>
          </div>
        )}

        <ThemeButton />
      </div>
    </div>
  )
}