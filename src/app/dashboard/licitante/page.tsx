"use client"

import { CarouselLotCard } from '@/components/my-components/CarouselLotCard'
import { CarouselWinningCard } from '@/components/my-components/CarouselWinningCard'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import useAuthRedirect from "@/hooks/useAuthRedirect"
import useMyWinnings from '@/hooks/useMyWinnings'
import useWalletValues from '@/hooks/useWalletValues'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

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

  const isPagePending = isWalletPending || isPending

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

      <div className='w-full flex gap-5 justify-between items-end mt-10'>
        <div className='flex flex-col font-bold'>
          <span>Saldo Livre atual</span>
          <span className='font-serif text-primary'>R$ {Number(walletValues?.availableBalance).toFixed(2)}</span>
        </div>
        <Button onClick={() => redirect('/carteira')}>Ir para a carteira</Button>
      </div>

      <Separator className="my-5" />

      <div className='w-full flex flex-col gap-5'>
        <span className='text-2xl font-bold text-secondary'>Lotes Arrematados</span>

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
    </div>
  )
}