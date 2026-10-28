"use client"

import { MyWinning } from "@/types/lots";
import { buttonVariants } from "../ui/button";
import Link from 'next/link';
import { ImageTitle } from './ImageTitle';

export function CarouselWinningCard({ winning }: { winning: MyWinning }) {
  return (
    <div className="w-full flex flex-col justify-between h-full gap-4 p-4">
      <ImageTitle 
          title={winning.title}
          imgUrl={winning.imageUrl || "/placeholder.png"}
        />

      <div className="flex flex-col gap-4">
        <div className='flex justify-between'>
          <div className='flex flex-col gap-1'>
            <span>Valor</span>
            <span className='font-serif text-primary'>{Number(winning.amount).toFixed(2).replace('.', ',')}</span>
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