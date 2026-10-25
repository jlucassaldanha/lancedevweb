"use client"

import useAuthRedirect from "@/hooks/useAuthRedirect"

export default function ArrematesPage() {
  useAuthRedirect('LICITANTE')

  return (
    <div className="flex flex-col px-10 mb-5">
      Arremates
    </div>
  )
}