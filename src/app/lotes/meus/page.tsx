"use client"

import { ErrorCard } from '@/components/my-components/ErrorCard'
import { LeiloeiroLotCard } from '@/components/my-components/LeiloeiroLotCard'
import { Spinner } from '@/components/ui/spinner'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import useMyPublishedLots from '@/hooks/useMyPublishedLots'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function MeusLotesPage() {
  useAuthRedirect('LEILOEIRO')

  const {
    lots,
    isPublishedLotsPending,
    publishedLotsError
  } = useMyPublishedLots()

  if (isPublishedLotsPending) return (
    <div className="flex w-full h-screen justify-center items-center p-10">
      <Spinner className="size-15 text-primary" />
    </div>
  )

  return (
    <div className="flex flex-col px-10 mb-5">
      <div>
        <Link href="/dashboard/leiloeiro" className="flex gap-2 mb-5">
          <ArrowLeftIcon />
          Voltar ao Dashboard
        </Link>
      </div>
      
      <div className='text-4xl text-secondary font-bold w-full'>
        Meus Lotes Publicados
      </div>

      {publishedLotsError?.message && (
        <div className='w-full m-5'>
          <ErrorCard message={publishedLotsError.message} title="Busca de Lotes"/>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        {lots.map((lot) => (
          <div key={lot.id}>
            <LeiloeiroLotCard lot={lot} />
          </div>
        ))}
      </div>
    </div>
  )
}