"use client"

import { LotsTemplate } from '@/components/my-components/LotsTemplate'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import useMyPublishedLots from '@/hooks/useMyPublishedLots'

export default function MeusLotesPage() {
  useAuthRedirect('LEILOEIRO')

  const {
    lots,
    isPublishedLotsPending,
    publishedLotsError
  } = useMyPublishedLots()

  return (
    <LotsTemplate 
      title='Meus Lotes Publicados'
      backLinkHref='/dashboard/leiloeiro'
      linkText='Voltar ao Dashboard'
      isPending={isPublishedLotsPending}
      lots={lots}
      error={publishedLotsError}
      isLeiloeiro
    />
  )
}