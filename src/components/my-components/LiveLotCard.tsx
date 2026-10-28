"use client"

import { LiveLot } from "@/types/lots";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { buttonVariants } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";
import Link from 'next/link';

export function LiveLotCard({ liveLot }: { liveLot?: LiveLot }) {

  const userAlreadyBid = liveLot?.bidsHistory.some((bid) => bid.isUserBid === true)

  return (
    <div className="w-full flex flex-col md:flex-row gap-14">
      <div className="flex flex-col gap-5 ">
        <div className="w-full aspect-square relative bg-muted/40 overflow-hidden flex items-center justify-center">
          <Image 
            src={liveLot?.lot.imageUrl || "/placeholder.png"}
            alt={liveLot?.lot.title || ""}
            width={500}
            height={500}
            className="object-contain p-2"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 md:w-2/4">
        <span className="text-4xl font-serif">{liveLot?.lot.title}</span>
        <Separator />

        <div className="flex flex-col justify-between h-full gap-3">
          <div>
            <Alert className={liveLot?.userStatus.isWinning ? "text-green-400" : "text-red-400"}>
              {liveLot?.userStatus.isWinning ? <CheckCircle2Icon /> : <AlertCircleIcon />}
              <AlertTitle>
                {liveLot?.lot.status === 'SCHEDULED' 
                  ? `Lote ainda não inciado` 
                  : !userAlreadyBid ? "Você ainda não fez lances" 
                  : liveLot?.userStatus.isWinning 
                  ? 'Você está ganhando!' : 'Você foi superado...'}
              </AlertTitle> 
              {liveLot?.lot.status === 'SCHEDULED' && 
              <AlertDescription>
                Agendado para {new Date(liveLot.lot.startTime).toLocaleDateString('pt-BR')}, {new Date(liveLot.lot.startTime).toLocaleTimeString('pt-BR')}
              </AlertDescription>}
            </Alert>
          </div>

          {liveLot?.lot.status === 'LIVE' && <CountdownTimer endTime={liveLot?.lot.endTime || ""}/>}

          <div className="flex gap-10 items-center">
            {liveLot?.currentLeader ? (
              <div className="flex flex-col gap-2"> 
                <span>Maior Lance</span>
                <span className="text-2xl font-serif text-primary">R$ {Number(liveLot.currentLeader.amount).toFixed(2)}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2"> 
                <span>Lance Inicial</span>
                <span className="text-3xl font-serif text-primary">R$ {Number(liveLot?.lot.startingBid).toFixed(2)}</span>
              </div>
            )}

            <div className="flex flex-col gap-2"> 
              <span>Incremento minimo</span>
              <span className=" text-xl font-serif">R$ {Number(liveLot?.lot.minimumIncrement).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-10">
          <Link 
            href={`/integridade/${liveLot?.lot.id}`} 
            className={buttonVariants({ variant: 'secondary' })}
          >
            Integridade
          </Link>
        </div>
      </div>
    </div>
  )
}