"use client"

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import useAuthRedirect from "@/hooks/useAuthRedirect"
import useWalletValues from '@/hooks/useWalletValues'
import { redirect } from 'next/navigation'

export default function ArrematesPage() {
  useAuthRedirect('LICITANTE')

  const {
    walletValues,
    isWalletPending,
    walletError
  } = useWalletValues()

  const isPagePending = isWalletPending

  if (isPagePending) return (
    <div className="flex w-full h-screen justify-center items-center p-10">
      <Spinner className="size-15 text-primary" />
    </div>
  )

  return (
    <div className="flex flex-col px-10 mb-5">
      <div className='text-4xl text-secondary font-bold w-full'>
        Dashboard do Licitante
      </div>

      <Separator className="mt-5" />

      <div className='w-full flex gap-5 justify-end items-end mt-10'>
        <div className='flex flex-col font-bold'>
          <span>Saldo Livre atual</span>
          <span className='font-serif text-primary'>R$ {Number(walletValues?.availableBalance).toFixed(2)}</span>
        </div>
        <Button onClick={() => redirect('/carteira')}>Ir para a carteira</Button>
      </div>
    </div>
  )
}