"use client"

import { MyWinning, PublicLot } from "@/types/lots";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { CountdownTimer } from './CountdownTimer';

export function CarouselWinningCard({ winning }: { winning: MyWinning }) {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full aspect-square relative bg-muted/30 overflow-hidden flex items-center justify-center">
        <Image 
          src={winning.imageUrl || "/placeholder.png"}
          alt={winning.title}
          fill
          className="object-contain p-2"
        />
      </div>
      
      <span className="text-3xl font-serif">{winning.title}</span>

      <Separator />

      <div className="flex gap-5 mt-5">
        <Button onClick={() => redirect(`/arremates/comprovante/${winning.lotId}`)}>Ver Comprovante do Lote</Button>
      </div>
    </div>
  )
}