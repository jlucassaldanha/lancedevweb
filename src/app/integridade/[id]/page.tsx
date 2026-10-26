"use client"

import { AuditCard } from "@/components/my-components/AuditCard";
import { ErrorCard } from '@/components/my-components/ErrorCard';
import { LotInfoCard } from "@/components/my-components/LotInfoCard";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useAudit } from "@/hooks/useAudit";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function IntegridadePage() {
  const {
    auditData,
    lotData,
    isPending,
    auditError,
    lotDataError
  } = useAudit()

  if (isPending) return (
    <div className="flex w-full h-screen justify-center items-center p-10">
      <Spinner className="size-15 text-primary" />
    </div>
  )
  
  return (
    <div className="flex flex-col px-4 md:px-10 mb-5">
      <div>
        <Link href="/" className="flex gap-2 mb-5">
          <ArrowLeftIcon />
          Voltar aos Lotes
        </Link>
      </div>

      {auditError?.message && (
        <div className='w-full m-5'>
          <ErrorCard message={auditError.message} title="Busca de Lotes"/>
        </div>
      )}

      {lotDataError?.message && (
        <div className='w-full m-5'>
          <ErrorCard message={lotDataError.message} title="Busca de Lotes"/>
        </div>
      )}

      <LotInfoCard 
        imgUrl={auditData?.lotImageUrl || "/placeholder.png"}
        title={auditData?.lotTitle || ""}
        auditData={auditData}
        lotData={lotData}
      />

      {(auditData?.totalBids ?? 0) > 0 && (
        <div className="mt-5 flex flex-col gap-5">
          <span className="text-2xl font-extrabold">Lances</span>
          <Separator />
          
          {auditData?.auditDetails.map((audit, i) => (
            <div key={audit.id} className="flex flex-col gap-5">
              <AuditCard 
                audit={audit}
                position={i+1}
              />
              <Separator />
            </div>
          ))}
        </div>
      )}      
    </div>
  )
}