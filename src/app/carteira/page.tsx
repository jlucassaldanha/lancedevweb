"use client"

import { MakeDepositForm } from '@/components/my-components/MakeDepositForm'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import useWalletValues from '@/hooks/useWalletValues'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function CarteiraPage() {
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
      <div>
        <Link href="/dashboard/licitante" className="flex gap-2 mb-5">
          <ArrowLeftIcon />
          Voltar para o Dashboard
        </Link>
      </div>

      <div className='text-4xl text-secondary font-bold w-full'>
        Carteira do Licitante
      </div>

      <Separator className="mt-5" />

      <div className='w-full flex flex-col md:flex-row gap-5 mt-10'>
        <div className='flex flex-col font-bold'>
          <span>Saldo Total atual</span>
          <span className='font-serif text-primary'>R$ {Number(walletValues?.totalBalance).toFixed(2)}</span>
        </div>

        <div className='flex flex-col font-bold'>
          <span>Saldo Comprometido atual</span>
          <span className='font-serif text-primary'>R$ {Number(walletValues?.committedBalance).toFixed(2)}</span>
        </div>

        <div className='flex flex-col font-bold'>
          <span>Saldo Livre atual</span>
          <span className='font-serif text-primary'>R$ {Number(walletValues?.availableBalance).toFixed(2)}</span>
        </div>
      </div>

      <Separator className="my-5"/>

      <div className='w-full'>
        <span className="text-2xl font-extrabold text-secondary">Fazer um deposito (simulado)</span>

        <MakeDepositForm />
      </div>
      
    </div>
  )
}