"use client"

import { PublicLot } from "@/types/lots";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { buttonVariants } from "../ui/button";
import { CountdownTimer } from './CountdownTimer';
import Link from 'next/link';
import { Bubble, BubbleContent } from "../ui/bubble";
import { ImageTitle } from './ImageTitle';
import { LotBasicInfo } from './LotBasicInfo';

export function CarouselLotCard({ lot }: { lot: PublicLot }) {
  const status = lot.status === "LIVE" 
    ? 'Ao Vivo' : lot.status === "FINISHED" 
    ? 'Finalizado' : 'Programado'

  return (
    <div className="w-full flex flex-col justify-between h-full gap-4 p-4">
      <ImageTitle 
        title={lot.title}
        imgUrl={lot.imageUrl || "/placeholder.png"}
      />
      
      <div className="flex flex-col gap-4">
        <LotBasicInfo lot={lot} status={status} />

        <div className="flex gap-2 mt-5">
          {lot.status === "LIVE" && (
            <Link 
              href={`/live/${lot.id}`}
              className={buttonVariants()}
            >
              Ver Ao Vivo
            </Link>
          )}
          {lot.status !== 'SCHEDULED' && (
            <Link 
              href={`/integridade/${lot.id}`}
              className={buttonVariants({ variant: 'secondary' })}
            >
              Integridade
            </Link>
          )}
        </div>
      </div>
      
    </div>
  )
}