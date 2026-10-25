"use client"

import { BidCard } from "@/components/my-components/BidCard";
import { LiveLotCard } from "@/components/my-components/LiveLotCard";
import { MainLotCard } from "@/components/my-components/MainLotCard";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import useLiveLot from "@/hooks/useLiveLot";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function LivePage() {
  
  const { liveData, isLivePending, liveError } = useLiveLot()

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

      <LiveLotCard 
        liveLot={liveData}
      />

      {(liveData?.bidsHistory.length ?? 0) > 0 ? (
        <div className="mt-5 flex flex-col gap-5">
          <span className="text-2xl font-extrabold">Lances</span>
          <Separator />
          
          {liveData?.bidsHistory.map((bid, i) => (
            <div key={bid.id} className="flex flex-col gap-5">
              <BidCard 
                bid={bid}
                position={i+1}
              />
              <Separator />
            </div>
          ))}
        </div>
      ) : (
        <span>Ainda não há Lances para esse Lote...</span>
      )}      
      
    </div>
  )
}