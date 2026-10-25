"use client"

import { Separator } from "@/components/ui/separator";
import { useAudit } from "@/hooks/useAudit";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LaudoPage() {
  const { data, isPending, isError } = useAudit()

  return (
    <div className="flex flex-col px-10 mb-5">
      <div>
        <Link href="/" className="flex gap-2 mb-5">
          <ArrowLeftIcon />
          Voltar ao Lotes
        </Link>
      </div>
      <div className="w-full flex gap-14">
        <div className="flex flex-col gap-5">
          <div className="w-full aspect-square relative bg-muted/30 overflow-hidden flex items-center justify-center">
            <Image 
              src={data?.lotImageUrl || ""}
              alt={data?.lotTitle || ""}
              width={500}
              height={600}
              className="object-contain p-2"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 w-2/4">
          <span className="text-5xl">{data?.lotTitle}</span>
          <Separator />
          <div className="flex flex-col justify-between h-full">
            <div className="flex gap-10 items-center">
              <div className="flex flex-col gap-2"> 
                Esta integro: {data?.isIntegrityIntact ? 'Sim' : 'Não'}
              </div>

              <div className="flex flex-col gap-2"> 
                Lances totais: {data?.totalBids}
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <span className="text-2xl">Lances</span>
        <Separator />
        <div>
          {data?.auditDetails.map((audit) => (
            <div key={audit.id} className="flex flex-col gap-5">
              <div className="flex justify-between">
                <span>Integro: {audit.isValid ? 'Sim' : 'Não'}</span>

                <span>{audit.bidderName}</span>

                <span>R$ {Number(audit.amount).toFixed(2)}</span>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}