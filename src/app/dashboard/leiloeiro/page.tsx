"use client"

import useAuthRedirect from "@/hooks/useAuthRedirect"

export default function DashboardPage() {
  useAuthRedirect('LEILOEIRO')

  return (
    <div className="flex flex-col px-10 mb-5">
      Dashboard leiloeiro
    </div>
  )
}