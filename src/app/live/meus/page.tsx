"use client"

import { LotsTemplate } from '@/components/my-components/LotsTemplate'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import useMyLiveLots from '@/hooks/useMyLiveLots'

export default function MeuLivePage() {
  useAuthRedirect('LICITANTE')

  const {
    lots,
    isLiveLotsPending,
    liveLotsError
  } = useMyLiveLots()

  return (
    <LotsTemplate 
      title='Meus Lotes Concorridos'
      backLinkHref='/dashboard/licitante'
      linkText='Voltar ao Dashboard'
      isPending={isLiveLotsPending}
      lots={lots}
      error={liveLotsError}
    />
  )
}