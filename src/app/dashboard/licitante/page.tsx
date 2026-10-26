"use client"

import { CarouselLotCard } from '@/components/my-components/CarouselLotCard'
import { CarouselWinningCard } from '@/components/my-components/CarouselWinningCard'
import { ErrorCard } from '@/components/my-components/ErrorCard'
import { Button, buttonVariants } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import useAuthRedirect from "@/hooks/useAuthRedirect"
import useMyLiveLots from '@/hooks/useMyLiveLots'
import useMyWinnings from '@/hooks/useMyWinnings'
import useWalletValues from '@/hooks/useWalletValues'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

export default function ArrematesPage() {
  useAuthRedirect('LICITANTE')

  const {
    walletValues,
    isWalletPending,
    walletError
  } = useWalletValues()

  const {
    winnings,
    isPending,
    error
  } = useMyWinnings()

  const {
    lots,
    isLiveLotsPending,
    liveLotsError
  } = useMyLiveLots()

  const isPagePending = isWalletPending || isPending || isLiveLotsPending

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

      {walletError?.message && (
        <div className='w-full m-5'>
          <ErrorCard message={walletError.message} title="Busca de Lotes"/>
        </div>
      )}

      <div className='w-full flex flex-col md:flex-row gap-5 justify-between md:items-end mt-10'>
        <div className='flex flex-col font-bold'>
          <span>Saldo Livre atual</span>
          <span className='font-serif text-primary'>R$ {Number(walletValues?.availableBalance).toFixed(2)}</span>
        </div>
        <Link href={'/carteira'} className={buttonVariants()}>Ir para a carteira</Link>
      </div>

      <Separator className="my-5" />

      <div className='w-full flex flex-col gap-3'>
        <span className='text-2xl font-bold text-secondary'>Lotes Arrematados</span>

        {error?.message && (
          <div className='w-full m-5'>
            <ErrorCard message={error.message} title="Busca de Lotes"/>
          </div>
        )}

        <div className='w-full flex justify-end'>
          <Link href="/arremates" className="flex gap-2 mb-5">
            Ver mais Arremates
            <ArrowRightIcon />
          </Link>
        </div>
        
        <div>
          <Carousel opts={{ align: "start" }} >
            <CarouselContent>
              {winnings.map((winning) => (
                <CarouselItem key={winning.lotId} className="md:basis-1/2 lg:basis-1/3">
                  <CarouselWinningCard winning={winning}/>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      
      <Separator className="my-5"/>

      <div className='w-full flex flex-col gap-3'>
        <span className='text-2xl font-bold text-secondary'>Lotes que dei Lance Ao Vivo</span>

        {liveLotsError?.message && (
          <div className='w-full m-5'>
            <ErrorCard message={liveLotsError.message} title="Busca de Lotes"/>
          </div>
        )}

        <div className='w-full flex justify-end'>
          <Link href="/live/meus" className="flex gap-2 mb-5">
            Ver mais Ao Vivo
            <ArrowRightIcon />
          </Link>
        </div>
        
        <div>
          <Carousel opts={{ align: "start" }} >
            <CarouselContent>
              {lots.map((lot) => (
                <CarouselItem key={lot.id} className="md:basis-1/2 lg:basis-1/3">
                  <CarouselLotCard lot={lot}/>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  )
}