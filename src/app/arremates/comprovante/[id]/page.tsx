"use client"

import { LotInfoCard } from "@/components/my-components/LotInfoCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import useReceipt from "@/hooks/useReceipt";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import Image from "next/image";

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
      <div className='text-4xl text-primary font-bold w-full'>
        Comprovante de Arremate
      </div>

      <Separator className="my-5"/>

      <LotInfoCard 
        comprovante
        imgUrl={receiptData?.imageUrl || ""}
        title={receiptData?.title || ""}
        receiptData={receiptData}
        auditData={auditData}
      />

      {!receiptData?.message && (
        <div className="w-full flex flex-col gap-2 mt-5">        
          <Separator />

          <div>Status: <span className={"flex " + auditDetails?.isValid ? "text-green-400" : 'text-red-400'}>{auditDetails?.isValid ? 'Integro' : 'Fraudado'}</span></div>
          <span>Hash Anterior: {auditDetails?.previousHash}</span>
          <span>Hash: {auditDetails?.storedHash}</span>
          <span>Hash Calculada: {auditDetails?.calculatedHash}</span>
        </div>
      )}        
    </div>
  )
}