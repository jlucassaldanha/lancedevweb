"use client"

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

      <div className="w-full flex gap-14">
        <div className="flex flex-col gap-5 w-2/4">
          <span className="text-5xl">{receiptData?.title}</span>
          <Separator />
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-10 items-center">
              {receiptData?.message ? (
                <div className="w-full flex flex-col gap-5">
                  <div className="w-full font-bold text-primary">
                    Finalizado em: {new Date(receiptData.closedAt).toLocaleDateString('pt-BR')}, {new Date(receiptData.closedAt).toLocaleTimeString('pt-BR')}
                  </div>

                  <Alert className="text-orange-400">
                    <AlertCircleIcon />
                    <AlertTitle>
                      Encerrado sem vencedor
                    </AlertTitle> 
                    <AlertDescription>
                      O Lote atual foi encerrado sem nenhum vencedor.
                    </AlertDescription>
                  </Alert>
                </div>
                
              ) : (
                <div className="w-full flex flex-col gap-5">
                  <div className="w-full font-bold text-primary">
                    Finalizado em: {new Date(receiptData?.closedAt || "").toLocaleDateString('pt-BR')}, {new Date(receiptData?.closedAt || "").toLocaleTimeString('pt-BR')}
                  </div>

                  <Alert className={auditData?.isIntegrityIntact ? "text-green-400" : "text-red-400"}>
                    {auditData?.isIntegrityIntact ? <CheckCircle2Icon /> : <AlertCircleIcon />}
                    <AlertTitle>
                      {auditData?.isIntegrityIntact ? 'O Lote encontra-se integro' : 'Lote fraudado'}
                    </AlertTitle> 
                  </Alert>

                  <div className="flex justify-between">
                    <div className="flex flex-col gap-2"> 
                      <span>Lance Vencedor</span>
                      <span className="text-2xl">R$ {Number(receiptData?.amount || 0).toFixed(2)}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span>Vencedor</span>
                      <span>{receiptData?.winnerName}</span>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="w-full aspect-square relative bg-muted/30 overflow-hidden flex items-center justify-center">
            <Image 
              src={receiptData?.imageUrl || ""}
              alt={receiptData?.title || ""}
              width={500}
              height={600}
              className="object-contain p-2"
            />
          </div>
        </div>
      </div>

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