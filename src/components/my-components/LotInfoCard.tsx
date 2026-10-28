import Image from "next/image";
import { Separator } from "../ui/separator";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { LotReceipt, PublicLot } from "@/types/lots";
import { AuditInfo } from "@/types/audit";

interface LotInfoCardProps {
  comprovante?: boolean
  imgUrl: string
  title: string
  auditData?: AuditInfo
  lotData?: PublicLot
  receiptData?: LotReceipt
}

export function LotInfoCard({ comprovante, imgUrl, title, receiptData, auditData, lotData }: LotInfoCardProps) {
  return (
    <div className={`w-full gap-5 md:gap-14 flex flex-col ${comprovante ? 'md:flex-row-reverse justify-end' : 'md:flex-row'}`}>
      <div className="flex flex-col gap-5">
        <div className="w-full aspect-square relative bg-muted/30 overflow-hidden flex items-center justify-center">
          <Image 
            src={imgUrl || "/placeholder.png"}
            alt={title}
            width={500}
            height={500}
            className="object-contain p-2"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 md:w-2/4">
        <h3 className="text-4xl font-serif text-secondary">{title}</h3>
        <Separator />

        {comprovante ? (
          <div className="flex flex-col gap-10 items-center">
            <div className='flex flex-col md:flex-row gap-10 w-full'>
              <div className="flex flex-col gap-2"> 
                <span>Artista</span>
                <span className="text-xl font-serif text-secondary">{lotData?.artistDisplayName || "Desconhecido"}</span>
              </div>
            </div>
            {receiptData?.message ? (
              <div className="w-full flex flex-col gap-5">
                <div className="w-full font-bold text-primary">
                  Finalizado em: <span className="font-serif">{new Date(receiptData.closedAt).toLocaleDateString('pt-BR')}, {new Date(receiptData.closedAt).toLocaleTimeString('pt-BR')}</span>
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
                  Finalizado em: <span className="font-serif">{new Date(receiptData?.closedAt || "").toLocaleDateString('pt-BR')}, {new Date(receiptData?.closedAt || "").toLocaleTimeString('pt-BR')}</span>
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
                    <span className="text-2xl font-serif text-primary">R$ {Number(receiptData?.amount || 0).toFixed(2).replace('.', ',')}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span>Vencedor</span>
                    <span className="font-serif">{receiptData?.winnerName}</span>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        ) : (
          <div className="flex flex-col justify-between h-full">
            {(auditData?.totalBids ?? 0 ) > 0 ? (
              <div className="flex flex-col gap-8 items-center">
                <Alert className={auditData?.isIntegrityIntact ? "text-green-400" : "text-red-400"}>
                  {auditData?.isIntegrityIntact ? <CheckCircle2Icon /> : <AlertCircleIcon />}
                  <AlertTitle>
                    {auditData?.isIntegrityIntact ? 'O Lote encontra-se integro' : 'Lote fraudado'}
                  </AlertTitle> 
                  <AlertDescription className={auditData?.isIntegrityIntact ? "text-green-400" : "text-red-400"}>
                    Confira os lances deste lote abaixo
                  </AlertDescription>
                </Alert>
                <div className="flex flex-col gap-3 text-sm">
                  <h4 className="text-xl font-bold">Sobre a integridade</h4>
                  <p>Para garantir que o leilão seja 100% honesto e transparente para todos os participantes, nosso sistema utiliza uma tecnologia de segurança avançada, semelhante à usada em Blockchain.</p>
                  <p>Isso significa que nenhum lance pode ser alterado, apagado ou inserido escondido no sistema.</p>
                  <h5 className="text-xl font-bold">Como isso protege você?</h5>
                  <dl className="flex flex-col gap-2">
                    <dt className="font-bold">Efeito Corrente:</dt>
                    <dd>Cada lance registrado gera uma assinatura digital única que depende diretamente do lance anterior. É como um elo de uma corrente ou um jogo de dominó matemático.</dd>
                    <dt className="font-bold">Impossível de Mudar:</dt>
                    <dd>Se alguém tentar alterar o valor de um lance antigo direto no sistema, essa assinatura quebra na mesma hora. Como o lance seguinte depende do anterior, todo o histórico desmorona e o sistema aponta a fraude instantaneamente.</dd>
                  </dl>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-10 items-center">
                <Alert className="text-orange-400">
                    <AlertCircleIcon />
                  <AlertTitle>
                    {lotData?.status === 'LIVE' ? "O Lote ainda não possui lances" : lotData?.status === 'SCHEDULED' ? "Este Lote ainda não foi iniciado" : "O Lote foi encerrado sem lances"}
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