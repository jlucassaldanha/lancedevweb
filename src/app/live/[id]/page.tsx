"use client"

import { BidCard } from "@/components/my-components/BidCard";
import { LiveLotCard } from "@/components/my-components/LiveLotCard";
import { MakeBidForm } from '@/components/my-components/MakeBidForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import useLiveLot from "@/hooks/useLiveLot";
import useMakeBid from "@/hooks/useMakeBid";
import useWalletValues from "@/hooks/useWalletValues";
import { AlertCircleIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Controller } from "react-hook-form";

export default function LivePage() {
  useAuthRedirect('LICITANTE')
  
  const { liveData, isLivePending, liveError } = useLiveLot()

  const {
    walletValues,
    isWalletPending,
    walletError
  } = useWalletValues()

  const isPagePending = isLivePending || isWalletPending

  if (isPagePending) return (
    <div className="flex w-full h-screen justify-center items-center p-10">
      <Spinner className="size-15 text-primary" />
    </div>
  )
  
  return (
    <div className="flex flex-col px-4 md:px-10 mb-5 gap-5">
      <div>
        <Link href="/" className="flex gap-2 mb-5">
          <ArrowLeftIcon />
          Voltar aos Lotes
        </Link>
      </div>

      <LiveLotCard 
        liveLot={liveData}
      />

      {!liveData?.userStatus.isWinning && liveData?.lot.status === 'LIVE' && (
        <MakeBidForm 
          avaliableBalance={Number(walletValues?.availableBalance).toFixed(2)}
        />
      )}

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