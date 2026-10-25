"use client"

import { PublicLot } from "@/types/lots";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export function MainLotCard({ lot }: { lot: PublicLot }) {
  const status = lot.status === "LIVE" 
    ? 'Ao Vivo' : lot.status === "FINISHED" 
    ? 'Finalizado' : 'Programado'

  return (
    <div className="w-full flex gap-14">
      <div className="flex flex-col gap-5">
        <div className="w-full aspect-square relative bg-muted/40 overflow-hidden flex items-center justify-center">
          <Image 
            src={lot.imageUrl}
            alt={lot.title}
            width={500}
            height={600}
            className="object-contain p-2"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 w-2/4">
        <span className="text-5xl">{lot.title}</span>
        <Separator />
        <div className="flex flex-col justify-between h-full">
          <Badge variant="secondary" className="mt-5">{status}</Badge>


          <div className="flex gap-10 items-center">
            {lot._count.bids > 0 ? (
              <div className="flex flex-col gap-2"> 
                <span>Maior Lance</span>
                <span className="text-2xl">R$ {Number(lot.bids[0].amount).toFixed(2)}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2"> 
                <span>Lance Inicial</span>
                <span className="text-2xl">R$ {Number(lot.startingBid).toFixed(2)}</span>
              </div>
            )}
            

            <div className="flex flex-col gap-2"> 
              <span>Incremento minimo</span>
              <span>R$ {Number(lot.minimumIncrement).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-10">
          {lot.status === "LIVE" && <Button>Ver Ao Vivo</Button>}
          <Button variant="outline" onClick={() => redirect(`/laudo/${lot.id}`)}>Ver Laudo</Button>
        </div>
      </div>
    </div>
  )
}