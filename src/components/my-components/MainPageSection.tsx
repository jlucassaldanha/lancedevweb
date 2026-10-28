import { PublicLot } from '@/types/lots';
import { MainLotCard } from './MainLotCard';
import { Separator } from '../ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { CarouselLotCard } from './CarouselLotCard';
import { ArrowRightLink } from './ArrowRightLink';

interface MainPageSectionProps { lotList: PublicLot[], placeholder: string, href: string }

export function MainPageSection({ lotList, placeholder, href }: MainPageSectionProps) {
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

          <ArrowRightLink 
            href={href}
            text='Ver mais Lotes'
          />

          <div>
            <Carousel opts={{ align: "start" }} >
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
        </div>
      )}
    </section>
  )
}