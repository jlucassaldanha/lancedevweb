"use client"

import Link from "next/link";
import { LogoLanceDev } from "./LogoLanceDev";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { ThemeButton } from "./ThemeButton";

export function Header() {
  const user = false

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
            Nome e botão de sair
          </div>
        ) : (
          <Button onClick={() => redirect('/login')}>
            Entrar
          </Button>
        )}

        <ThemeButton />
      </div>
    </div>
  )
}