"use client"

import { LotInfoCard } from "@/components/my-components/LotInfoCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useAudit } from "@/hooks/useAudit";
import { AlertCircleIcon, ArrowLeftIcon, CheckCircle2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LaudoPage() {
  const { data, isPending, isError } = useAudit()

  if (isPending) return (
    <div className="flex w-full h-screen justify-center items-center p-10">
      <Spinner className="size-15 text-primary" />
    </div>
  )

  return (
    <div className="flex flex-col px-10 mb-5">
      <div>
        <Link href="/" className="flex gap-2 mb-5">
          <ArrowLeftIcon />
          Voltar ao Lotes
        </Link>
      </div>

      <LotInfoCard 
        imgUrl={data?.lotImageUrl || ""}
        title={data?.lotTitle || ""}
        auditData={data}
      />

      {(data?.totalBids ?? 0) > 0 && (
        <div className="mt-5 flex flex-col gap-5">
          <span className="text-2xl">Lances</span>
          <Separator />
          <div>
            {data?.auditDetails.map((audit, i) => (
              <div key={audit.id} className="flex flex-col gap-5">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-2xl">#{i+1} - {audit.bidderName}</span>
                    <div>Status: <span className={"flex " + audit.isValid ? "text-green-400" : 'text-red-400'}>{audit.isValid ? 'Integro' : 'Fraudado'}</span></div>
                    <span>Hash Anterior: {audit.previousHash}</span>
                    <span>Hash: {audit.storedHash}</span>
                    <span>Hash Calculada: {audit.calculatedHash}</span>
                  </div>
                  <span className="text-2xl">R$ {Number(audit.amount).toFixed(2)}</span>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </div>
      )}      
    </div>
  )
}