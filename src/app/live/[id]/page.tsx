"use client"

import { ArrowLeftLink } from "@/components/my-components/ArrowLeftLink";
import { BidCard } from "@/components/my-components/BidCard";
import { ErrorCard } from '@/components/my-components/ErrorCard';
import { LiveLotCard } from "@/components/my-components/LiveLotCard";
import { MakeBidForm } from '@/components/my-components/MakeBidForm';
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import useLiveLot from "@/hooks/useLiveLot";
import useWalletValues from "@/hooks/useWalletValues";

export default function LivePage() {
  useAuthRedirect('LICITANTE')
  
  const { 
    liveData, 
    isLivePending, 
    liveError 
  } = useLiveLot()

  const {
    walletValues,
    isWalletPending,
    walletError
  } = useWalletValues()

  const isPagePending = isLivePending || isWalletPending

  const indexOfUserLatestBid = liveData?.bidsHistory.findIndex(bid => bid.isUserBid)

  if (isPagePending) return (
    <div className="flex w-full h-screen justify-center items-center p-10">
      <Spinner className="size-15 text-primary" />
    </div>
  )
  
  return (
    <div className="flex flex-col px-4 md:px-10 mb-5 gap-5">
      <ArrowLeftLink 
        href="/"
        text="Voltar aos Lotes"
      />
      
      {liveError?.message && (
        <div className='w-full m-5'>
          <ErrorCard message={liveError.message} title="Busca de Lotes"/>
        </div>
      )}

      {walletError?.message && (
        <div className='w-full m-5'>
          <ErrorCard message={walletError.message} title="Busca de Lotes"/>
        </div>
      )}

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
          <h3 className="text-2xl font-extrabold">Lances</h3>
          <Separator />
          
          {liveData?.bidsHistory.map((bid, i) => (
            <div key={bid.id} className="flex flex-col gap-5">
              <BidCard 
                bid={bid}
                position={i+1}
                isUserLatestBid={i === indexOfUserLatestBid}
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