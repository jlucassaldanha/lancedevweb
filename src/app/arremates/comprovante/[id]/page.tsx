"use client"

import { AuditCard } from "@/components/my-components/AuditCard";
import { ErrorCard } from '@/components/my-components/ErrorCard';
import { LotInfoCard } from "@/components/my-components/LotInfoCard";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import useReceipt from "@/hooks/useReceipt";

export default function ComprovantePage() {
  const {
    receiptData,
    receiptError,
    auditData,
    auditError,
    isPending
  } = useReceipt()

  const auditDetails = auditData?.auditDetails.filter((audit) => audit.bidderName === receiptData?.winnerName)[0]

  if (isPending) return (
    <div className="flex w-full h-screen justify-center items-center p-10">
      <Spinner className="size-15 text-primary" />
    </div>
  )

  return (
    <div className="flex flex-col px-10 mb-5">
      <h2 className='text-4xl text-secondary font-bold w-full mb-10'>
        Comprovante de Arremate
      </h2>

      {auditError?.message && (
        <div className='w-full mb-5'>
          <ErrorCard message={auditError.message} title="Busca de Lotes"/>
        </div>
      )}

      <LotInfoCard 
        comprovante
        imgUrl={receiptData?.imageUrl || ""}
        title={receiptData?.title || ""}
        receiptData={receiptData}
        auditData={auditData}
      />

      {!receiptData?.message && (
        <div className="w-full flex flex-col gap-2">        
          <Separator className="my-5"/>

          {receiptError?.message && (
            <div className='w-full mb-5'>
              <ErrorCard message={receiptError.message} title="Busca de Lotes"/>
            </div>
          )}

          <AuditCard 
            comprovante
            audit={auditDetails}
          />
        </div>
      )}        
    </div>
  )
}