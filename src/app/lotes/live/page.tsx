"use client"

import { LotsTemplate } from '@/components/my-components/LotsTemplate'
import useListLots from '@/hooks/useListLots'

export default function LotesLivePage() {
  const {
    liveLots,
    isPending,
    error
  } = useListLots()

  return (
    <LotsTemplate 
      title='Lotes Ao Vivo'
      backLinkHref='/'
      linkText='Voltar ao Inicio'
      isPending={isPending}
      lots={liveLots}
      error={error}
    />
  )
}