"use client"

import { LotsTemplate } from '@/components/my-components/LotsTemplate'
import useListLots from '@/hooks/useListLots'

export default function LotesFinalizadosPage() {
  const {
    finishedLots,
    isPending,
    error
  } = useListLots()

  return (
    <LotsTemplate 
      title='Lotes Finalizados'
      backLinkHref='/'
      linkText='Voltar ao Inicio'
      isPending={isPending}
      lots={finishedLots}
      error={error}
    />
  )
}