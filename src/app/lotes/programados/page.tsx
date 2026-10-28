"use client"

import { LotsTemplate } from '@/components/my-components/LotsTemplate'
import useListLots from '@/hooks/useListLots'

export default function LotesProgramadosPage() {
  const {
    scheduledLots,
    isPending,
    error
  } = useListLots()

  return (
    <LotsTemplate 
      title='Lotes Programados'
      backLinkHref='/'
      linkText='Voltar ao Inicio'
      isPending={isPending}
      lots={scheduledLots}
      error={error}
    />
  )
}