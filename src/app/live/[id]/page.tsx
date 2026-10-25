"use client"

import { Spinner } from "@/components/ui/spinner";
import useLiveLot from "@/hooks/useLiveLot";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function LivePage() {
  
  const { liveData, isLivePending, liveError } = useLiveLot()

  console.log(liveData)

  if (isLivePending) return (
    <div className="flex w-full h-screen justify-center items-center p-10">
      <Spinner className="size-15 text-primary" />
    </div>
  )
  
  return (
    <div className="flex flex-col px-4 md:px-10 mb-5">
      <div>
        <Link href="/" className="flex gap-2 mb-5">
          <ArrowLeftIcon />
          Voltar ao Lotes
        </Link>
      </div>

      
    </div>
  )
}