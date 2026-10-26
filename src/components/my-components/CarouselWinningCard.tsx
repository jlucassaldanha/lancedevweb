"use client"

import { MyWinning } from "@/types/lots";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { buttonVariants } from "../ui/button";
import Link from 'next/link';

export function CarouselWinningCard({ winning }: { winning: MyWinning }) {
  return (
    <div className="w-full flex flex-col justify-between h-full gap-4 p-4">
      <div className='flex flex-col gap-3'>
        <div className="w-full aspect-square relative bg-muted/30 overflow-hidden flex items-center justify-center">
          <Image 
            src={winning.imageUrl || "/placeholder.png"}
            alt={winning.title}
            fill
            className="object-contain p-2"
          />
        </div>
        
        <span className="text-3xl font-serif">{winning.title}</span>
      </div>

      <div className="flex flex-col gap-4">
        <Separator />

        <div className='flex justify-between'>
          <div className='flex flex-col gap-1'>
            <span>Valor</span>
            <span className='font-serif text-primary'>{Number(winning.amount).toFixed(2)}</span>
          </div>

          <div className='flex flex-col gap-1'>
            <span>Data</span>
            <span className='font-serif text-primary'>{new Date(winning.closedAt).toLocaleDateString()}</span>
          </div>
        </div>
        

        <div className="flex mt-5">
          <Link href={`/arremates/comprovante/${winning.lotId}`} className={buttonVariants()}>Ver Comprovante</Link>
        </div>
      </div>
    </div>
  )
}