"use client"

import { PublicLot } from "@/types/lots";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button, buttonVariants } from "../ui/button";
import { CountdownTimer } from './CountdownTimer';
import Link from 'next/link';
import { Bubble, BubbleContent } from "../ui/bubble";
import useCancelLot from "@/hooks/useCancelLot";
import { ErrorCard } from "./ErrorCard";
import { ImageTitle } from './ImageTitle';
import { LotBasicInfo } from './LotBasicInfo';

export function LeiloeiroLotCard({ lot }: { lot: PublicLot }) {
  const {
    mutate,
    isPending,
    error
  } = useCancelLot()

  const status = lot.status === "LIVE" 
    ? 'Ao Vivo' : lot.status === "FINISHED" 
    ? 'Finalizado' : lot.status === 'CANCELLED' ? 'Cancelado' : 'Programado'

  return (
    <div className="w-full flex flex-col justify-between h-full gap-4 p-4">
      <ImageTitle 
        title={lot.title}
        imgUrl={lot.imageUrl || "/placeholder.png"}
      />
      
      <div className="flex flex-col gap-4">
        <LotBasicInfo lot={lot} status={status} />

        <div className="flex gap-2 mt-5">
          {lot.status !== 'SCHEDULED' && (
            <Link 
              href={`/integridade/${lot.id}`}
              className={buttonVariants({ variant: 'secondary' })}
            >
              Integridade
            </Link>
          )}
          {(lot.bids.length <= 0 && (lot.status === 'LIVE' || lot.status === 'SCHEDULED')) && (
            <Button 
              variant="destructive"
              onClick={() => mutate(lot.id)}
            >
              {isPending ? "Cancelando..." : "Cancelar Lote"}
            </Button>
          )}
        </div>

        {error?.message && (
          <div className='w-full m-5'>
            <ErrorCard message={error.message} title="Busca de Lotes"/>
          </div>
        )}
      </div>
      
    </div>
  )
}