"use client"

import { LiveLot } from "@/types/lots";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { Alert, AlertTitle } from "../ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";
import { Card, CardContent } from "../ui/card";

export function LiveLotCard({ liveLot }: { liveLot?: LiveLot }) {

  const userAlreadyBid = liveLot?.bidsHistory.some((bid) => bid.isUserBid === true)

  return (
    <div className="w-full flex flex-col md:flex-row gap-14">
      <div className="flex flex-col gap-5">
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
        <span className="text-5xl font-serif">{liveLot?.lot.title}</span>
        <Separator />

        <div className="flex flex-col justify-between h-full">
          <div>
            <Alert className={liveLot?.userStatus.isWinning ? "text-green-400" : "text-red-400"}>
              {liveLot?.userStatus.isWinning ? <CheckCircle2Icon /> : <AlertCircleIcon />}
              <AlertTitle>
                {!userAlreadyBid ? "Você ainda não fez lances" : liveLot?.userStatus.isWinning ? 'Você está ganhando!' : 'Você foi superado...'}
              </AlertTitle> 
            </Alert>
          </div>

          <Card>
            <CardContent className="flex flex-col gap-2 font-bold">
              <span>Contagem regressiva para o encerramento do Lote</span>
              <CountdownTimer endTime={liveLot?.lot.endTime || ""}/>
            </CardContent>
          </Card>

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
  
          <Button variant="secondary" onClick={() => redirect(`/laudo/${liveLot?.lot.id}`)}>Ver Laudo</Button>
        </div>
      </div>
    </div>
  )
}