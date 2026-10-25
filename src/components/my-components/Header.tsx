"use client"

import Link from "next/link";
import { LogoLanceDev } from "./LogoLanceDev";
import { Button } from "../ui/button";
import { redirect, usePathname } from "next/navigation";
import { ThemeButton } from "./ThemeButton";
import { useAuth } from "@/contexts/authContext";
import { logoutAction } from "@/actions/auth";

export function Header() {
  const pathName = usePathname()

  const auth = useAuth()

  const accountLink = auth.user?.role === "LICITANTE" ? "/arremates": "/dashboard"

  if (pathName === '/login' || pathName === '/register') {
    return null
  }

  const user = auth.user

  return (
    <div className="flex justify-between items-center mb-4 px-10 py-6">
      <Link href={'/'}>
        <div className='md:text-3xl'>
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
            <Button onClick={() => redirect('/login')}>
              Entrar
            </Button>

            <Button onClick={() => redirect('/register')} variant="secondary">
              Criar Conta
            </Button>
          </div>
        )}

        <ThemeButton />
      </div>
    </div>
  )
}