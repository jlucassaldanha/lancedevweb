"use client"

import { ArrowRightLink } from '@/components/my-components/ArrowRightLink'
import { BalanceComponent } from '@/components/my-components/BalanceComponent'
import { ErrorCard } from '@/components/my-components/ErrorCard'
import { LeiloeiroLotCard } from '@/components/my-components/LeiloeiroLotCard'
import { buttonVariants } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import useAuthRedirect from "@/hooks/useAuthRedirect"
import useMyPublishedLots from '@/hooks/useMyPublishedLots'
import useWalletValues from '@/hooks/useWalletValues'
import Link from 'next/link'

export default function DashboardPage() {
  useAuthRedirect('LEILOEIRO')

  const {
    walletValues,
    isWalletPending,
    walletError
  } = useWalletValues()

  const {
    lots,
    isPublishedLotsPending,
    publishedLotsError
  } = useMyPublishedLots()

  const isPagePending = isWalletPending || isPublishedLotsPending

  if (isPagePending) return (
    <div className="flex w-full h-screen justify-center items-center p-10">
      <Spinner className="size-15 text-primary" />
    </div>
  )

  return (
    <div className="flex flex-col px-10 mb-5">
      <h2 className='text-4xl text-secondary font-bold w-full'>
        Dashboard do Leiloeiro
      </h2>

      {walletError?.message && (
        <div className='w-full m-5'>
          <ErrorCard message={walletError.message} title="Busca de Lotes"/>
        </div>
      )}

      <div className='w-full flex flex-col md:flex-row gap-5 justify-between md:items-end mt-10'>
        <BalanceComponent availableBalance={walletValues?.availableBalance}/>
        <Link href={'/lotes/publicar'} className={buttonVariants()}>Publicar novo Lote</Link>
      </div>

      <Separator className="my-5" />

      <div className='w-full flex flex-col gap-3'>
        <h3 className='text-2xl font-bold text-secondary'>Meus Lotes</h3>

        {publishedLotsError?.message && (
          <div className='w-full m-5'>
            <ErrorCard message={publishedLotsError.message} title="Busca de Lotes"/>
          </div>
        )}

        <ArrowRightLink 
          href='/lotes/meus'
          text='Ver mais Lotes'
        />
        
        {lots.length === 0 ? (
          <span>Você não possui lotes publicados</span>
        ) : (
          <div>
            <Carousel opts={{ align: "start" }} >
              <CarouselContent>
                {lots.map((lot) => (
                  <CarouselItem key={lot.id} className="md:basis-1/2 lg:basis-1/3 flex">
                    <LeiloeiroLotCard lot={lot}/>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  )
}