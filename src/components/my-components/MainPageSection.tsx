import { PublicLot } from '@/types/lots';
import { MainLotCard } from './MainLotCard';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { CarouselLotCard } from './CarouselLotCard';

export function MainPageSection({ lotList, placeholder }: { lotList: PublicLot[], placeholder: string}) {
  return (
    <section className="w-full flex flex-col gap-5">
      {lotList.length > 0 ? (
        <MainLotCard lot={lotList[0]} />
      ) : (
        <span>{placeholder}</span>
      )}

      {lotList.length > 1 && (
        <div>
          <Separator className="my-10"/>

          <div className='w-full flex justify-end'>
            <Link href="/lotes/live" className="flex gap-2 mb-5">
              Ver mais Lotes
              <ArrowRightIcon />
            </Link>
          </div>

          <Carousel opts={{ align: "start" }} className='w-full px-10'>
            <CarouselContent className='-ml-6'>
              {lotList.slice(1).map((lot) => (
                <CarouselItem key={lot.id} className="pl-6 md:basis-1/2 lg:basis-1/3 flex">
                  <CarouselLotCard lot={lot}/>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </section>
  )
}