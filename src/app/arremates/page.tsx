"use client"

import { ArrowLeftLink } from '@/components/my-components/ArrowLeftLink'
import { CarouselWinningCard } from '@/components/my-components/CarouselWinningCard'
import { ErrorCard } from '@/components/my-components/ErrorCard'
import { Spinner } from '@/components/ui/spinner'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import useMyWinnings from '@/hooks/useMyWinnings'

export default function ArrematesPage() {
  useAuthRedirect('LICITANTE')

  const {
    winnings,
    isPending,
    error
  } = useMyWinnings()

  if (isPending) return (
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
        Meus Arremates
      </h2>

      {error?.message && (
        <div className='w-full mb-5'>
          <ErrorCard message={error.message} title="Busca de Lotes"/>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        {winnings.map((winning) => (
          <div key={winning.lotId}>
            <CarouselWinningCard winning={winning} />
          </div>
        ))}
      </div>
    </div>
  )
}