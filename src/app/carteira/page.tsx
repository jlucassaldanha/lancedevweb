"use client"

import { ArrowLeftLink } from '@/components/my-components/ArrowLeftLink'
import { ErrorCard } from '@/components/my-components/ErrorCard'
import { MakeDepositForm } from '@/components/my-components/MakeDepositForm'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import useWalletValues from '@/hooks/useWalletValues'

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
      <ArrowLeftLink 
        href='/dashboard/licitante'
        text='Voltar para o Dashboard'
      />

      <h2 className='text-4xl text-secondary font-bold w-full'>
        Carteira do Licitante
      </h2>
      
      {walletError?.message && (
        <div className='w-full mb-5'>
          <ErrorCard message={walletError.message} title="Busca de Lotes"/>
        </div>
      )}

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
        <h3 className="text-2xl font-extrabold text-secondary">Fazer um deposito (simulado)</h3>

        <MakeDepositForm />
      </div>
      
    </div>
  )
}