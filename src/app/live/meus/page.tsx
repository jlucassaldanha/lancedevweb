"use client"

import { CarouselLotCard } from '@/components/my-components/CarouselLotCard'
import { ErrorCard } from '@/components/my-components/ErrorCard'
import { Spinner } from '@/components/ui/spinner'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import useMyLiveLots from '@/hooks/useMyLiveLots'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function MeuLivePage() {
  useAuthRedirect('LICITANTE')

  const {
      lots,
      isLiveLotsPending,
      liveLotsError
    } = useMyLiveLots()

  if (isLiveLotsPending) return (
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
        Meus Lotes ao Vivo
      </div>

      {liveLotsError?.message && (
        <div className='w-full m-5'>
          <ErrorCard message={liveLotsError.message} title="Busca de Lotes"/>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        {lots.map((lot) => (
          <div key={lot.id}>
            <CarouselLotCard lot={lot} />
          </div>
        ))}
      </div>
    </div>
  )
}