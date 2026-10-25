"use client"

import { PublicLot } from "@/types/lots";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export function CarouselLotCard({ lot }: { lot: PublicLot }) {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full aspect-square relative bg-muted/30 overflow-hidden flex items-center justify-center">
        <Image 
          src={lot.imageUrl}
          alt={lot.title}
          fill
          className="object-contain p-2"
        />
      </div>
      
      <span className="text-3xl">{lot.title}</span>

      <Separator />
      
      <div className="flex flex-col justify-between h-full">
        <div className="flex gap-10 items-center">
          <div className="flex flex-col gap-2"> 
            <span>Maior Lance</span>
            <span className="text-2xl">R$ {Number(lot.winningBid.amount).toFixed(2)}</span>
          </div>

          <div className="flex flex-col gap-2"> 
            <span>Incremento minimo</span>
            <span>R$ {Number(lot.minimumIncrement).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-5 mt-5">
        {lot.status === "LIVE" && <Button>Ver Ao Vivo</Button>}
        <Button variant="outline" onClick={() => redirect(`/laudo/${lot.id}`)}>Ver Laudo</Button>
      </div>
    </div>
  )
}