"use client"

import { CarouselLotCard } from '@/components/my-components/CarouselLotCard'
import { ErrorCard } from '@/components/my-components/ErrorCard'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import useListLots from '@/hooks/useListLots'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function LotesLivePage() {
  const {
    liveLots,
    isPending,
    error
  } = useListLots()

  if (isPending) return (
    <div className="flex w-full h-screen justify-center items-center p-10">
      <Spinner className="size-15 text-primary" />
    </div>
  )

  return (
    <div className="flex flex-col px-10 mb-5">
      <div>
        <Link href="/" className="flex gap-2 mb-5">
          <ArrowLeftIcon />
          Voltar ao Inicio
        </Link>
      </div>
      
      <div className='text-4xl text-secondary font-bold w-full'>
        Lotes ao Vivo
      </div>

      <Separator className="my-5"/>

      {error?.message && (
        <div className='w-full m-5'>
          <ErrorCard message={error.message} title="Busca de Lotes"/>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        {liveLots.map((lot) => (
          <div key={lot.id}>
            <CarouselLotCard lot={lot} />
          </div>
        ))}
      </div>
    </div>
  )
}