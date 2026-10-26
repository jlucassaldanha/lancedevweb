"use client"

import { PublicLot } from "@/types/lots";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { buttonVariants } from "../ui/button";
import { CountdownTimer } from './CountdownTimer';
import Link from 'next/link';

export function MainLotCard({ lot }: { lot: PublicLot }) {
  const status = lot.status === "LIVE" 
    ? 'Ao Vivo' : lot.status === "FINISHED" 
    ? 'Finalizado' : 'Programado'

  return (
    <div className="w-full flex flex-col md:flex-row gap-14">
      <div className="flex flex-col gap-5">
        <div className="w-full aspect-square relative bg-muted/40 overflow-hidden flex items-center justify-center">
          <Image 
            src={lot.imageUrl || "/placeholder.png"}
            alt={lot.title}
            width={500}
            height={500}
            className="object-contain p-2"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 md:w-2/4">
        <span className="text-4xl font-serif">{lot.title}</span>
        <Separator />
        <div className="flex flex-col justify-between h-full gap-3">
          <Badge variant="secondary" className="mt-5">{status}</Badge>

          {lot.status === 'LIVE' && <CountdownTimer endTime={lot.endTime}/>}

          <div className="flex gap-10 items-center">
            {lot._count.bids > 0 ? (
              <div className="flex flex-col gap-2"> 
                <span>Maior Lance</span>
                <span className="text-2xl font-serif">R$ {Number(lot.bids[0].amount).toFixed(2)}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2"> 
                <span>Lance Inicial</span>
                <span className="text-3xl font-serif">R$ {Number(lot.startingBid).toFixed(2)}</span>
              </div>
            )}
            

            <div className="flex flex-col gap-2"> 
              <span>Incremento minimo</span>
              <span className=" text-xl font-serif">R$ {Number(lot.minimumIncrement).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-10">
          {lot.status === "LIVE" && (
            <Link href={`/live/${lot.id}`} className={buttonVariants()}>Ver Ao Vivo</Link>
          )}
          {lot.status !== 'SCHEDULED' && (
            <Link href={`/integridade/${lot.id}`} className={buttonVariants({ variant: 'secondary' })}>Integridade</Link>
          )}
        </div>
      </div>
    </div>
  )
}