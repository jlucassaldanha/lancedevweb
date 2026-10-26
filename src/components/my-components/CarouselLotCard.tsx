"use client"

import { PublicLot } from "@/types/lots";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { CountDownCard } from "./CountDownCard";

export function CarouselLotCard({ lot }: { lot: PublicLot }) {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full aspect-square relative bg-muted/30 overflow-hidden flex items-center justify-center">
        <Image 
          src={lot.imageUrl || "/placeholder.png"}
          alt={lot.title}
          fill
          className="object-contain p-2"
        />
      </div>
      
      <span className="text-3xl font-serif">{lot.title}</span>

      <Separator />
      
      <div className="flex flex-col justify-between h-full gap-2">
        {lot.status === 'LIVE' && <CountDownCard endTime={lot.endTime}/>}

        <div className="flex gap-10 items-center">
          {lot._count.bids > 0 ? (
              <div className="flex flex-col gap-2"> 
                <span>Maior Lance</span>
                <span className="text-xl font-serif">R$ {Number(lot.bids[0].amount).toFixed(2)}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2"> 
                <span>Lance Inicial</span>
                <span className="text-xl font-serif">R$ {Number(lot.startingBid).toFixed(2)}</span>
              </div>
            )}

          <div className="flex flex-col gap-2"> 
            <span>Incremento</span>
            <span className="font-serif">R$ {Number(lot.minimumIncrement).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-5 mt-5">
        {lot.status === "LIVE" && <Button onClick={() => redirect(`/live/${lot.id}`)}>Ver Ao Vivo</Button>}
        {lot.status !== 'SCHEDULED' && <Button variant="secondary" onClick={() => redirect(`/laudo/${lot.id}`)}>Ver Laudo</Button>}
      </div>
    </div>
  )
}