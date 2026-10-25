"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useAudit } from "@/hooks/useAudit";
import { AlertCircleIcon, ArrowLeftIcon, CheckCircle2Icon } from "lucide-react";
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
            <div className="flex flex-col gap-10 items-center">
              <Alert className={data?.isIntegrityIntact ? "text-green-400" : "text-red-400"}>
                {data?.isIntegrityIntact ? <CheckCircle2Icon /> : <AlertCircleIcon />}
                <AlertTitle>
                  {data?.isIntegrityIntact ? 'O Lote encontra-se integro' : 'Lote fraudado'}
                </AlertTitle> 
                <AlertDescription>
                  Confira os lances deste lote abaixo
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </div>

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
                  <span>{audit.calculatedHash}</span>
                </div>
                <span className="text-2xl">R$ {Number(audit.amount).toFixed(2)}</span>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}