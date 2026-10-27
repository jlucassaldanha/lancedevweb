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
      <div className='flex flex-col gap-3'>
        <div className="w-full aspect-square relative bg-muted/30 overflow-hidden flex items-center justify-center">
          <Image 
            src={lot.imageUrl || "/placeholder.png"}
            alt={lot.title}
            fill
            className="object-contain p-2"
          />
        </div>
        
        <span className="text-2xl font-serif line-clamp-2 min-h-14 flex items-center">{lot.title}</span>
        <Separator />
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between h-full gap-2">
          {lot.status === 'LIVE' && <CountdownTimer endTime={lot.endTime}/>}
          
          <div className="flex gap-10 items-center">
            <Bubble variant={lot.status === 'FINISHED' ? "muted" : lot.status === 'LIVE' ? "default" : lot.status === 'CANCELLED' ? "destructive" : "secondary"}>
              <BubbleContent >
                {status}
              </BubbleContent>
            </Bubble>

            {(lot.bids.length > 0 && lot.status === 'FINISHED') && (
              <Bubble>
                <BubbleContent >
                  Arrematado
                </BubbleContent>
              </Bubble>
            )}
          </div>

          <div className="flex gap-10 items-center">
            {lot.bids.length > 0 ? (
                <div className="flex flex-col gap-2"> 
                  <span>{lot.status === 'FINISHED' ? "Lance Vencedor" : "Maior Lance"}</span>
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