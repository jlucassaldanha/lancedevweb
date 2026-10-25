import Image from "next/image";
import { Separator } from "../ui/separator";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { LotReceipt } from "@/types/lots";
import { AuditInfo } from "@/types/audit";

interface LotInfoCardProps {
  comprovante?: boolean
  imgUrl: string
  title: string
  auditData?: AuditInfo
  receiptData?: LotReceipt
}

export function LotInfoCard({ comprovante, imgUrl, title, receiptData, auditData }: LotInfoCardProps) {
  return (
    <div className={`w-full gap-5 md:gap-14 flex flex-col ${comprovante ? 'md:flex-row-reverse justify-end' : 'md:flex-row'}`}>
      <div className="flex flex-col gap-5">
        <div className="w-full aspect-square relative bg-muted/30 overflow-hidden flex items-center justify-center">
          <Image 
            src={imgUrl}
            alt={title}
            width={500}
            height={500}
            className="object-contain p-2"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 md:w-2/4">
        <span className="text-5xl">{title}</span>
        <Separator />

        {comprovante ? (
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
        ) : (
          <div className="flex flex-col justify-between h-full">
            {(auditData?.totalBids ?? 0 ) > 0 ? (
              <div className="flex flex-col gap-10 items-center">
                <Alert className={auditData?.isIntegrityIntact ? "text-green-400" : "text-red-400"}>
                  {auditData?.isIntegrityIntact ? <CheckCircle2Icon /> : <AlertCircleIcon />}
                  <AlertTitle>
                    {auditData?.isIntegrityIntact ? 'O Lote encontra-se integro' : 'Lote fraudado'}
                  </AlertTitle> 
                  <AlertDescription>
                    Confira os lances deste lote abaixo
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="flex flex-col gap-10 items-center">
                <Alert className="text-orange-400">
                    <AlertCircleIcon />
                  <AlertTitle>
                    O Lote foi encerrado sem lances
                  </AlertTitle>
                </Alert>
              </div>
            )}  
          </div>
        )}
      </div>
    </div>
  )
}