"use client"

import { CarouselLotCard } from "@/components/my-components/CarouselLotCard";
import { MainLotCard } from "@/components/my-components/MainLotCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useListLots from "@/hooks/useListLots";

export default function Home() {
  const { 
    liveLots,
    scheduledLots,
    finishedLots, 
    isPending, 
    isError 
  } = useListLots()

  console.log(liveLots)

  return (
    <div className='flex flex-col gap-5 px-10'>
      
      <div className="mb-5">
        <Tabs defaultValue="LIVE">
          <TabsList className="mb-5">
            <TabsTrigger value='LIVE'>Ao Vivo</TabsTrigger>
            <TabsTrigger value='SCHEDULED'>Programados</TabsTrigger>
            <TabsTrigger value='FINISHED'>Finalizados</TabsTrigger>
          </TabsList>

          <TabsContent value="LIVE">
            <div className="w-full flex flex-col gap-5">
              {liveLots.length > 0 ? (
                <MainLotCard lot={liveLots[0]} />
              ) : (
                <span>Não há lotes publicados Ao vivo nesse momento</span>
              )}

              {liveLots.length > 1 && (
                <div>
                  <Separator className="my-10"/>
                  <Carousel opts={{ align: "start" }} >
                    <CarouselContent>
                      {liveLots.slice(1).map((lot) => (
                        <CarouselItem key={lot.id} className="basis-1/2 lg:basis-1/4">
                          <CarouselLotCard lot={lot}/>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="SCHEDULED">
            <div className="w-full flex flex-col gap-5">
              {scheduledLots.length > 0 ? (
                <MainLotCard lot={scheduledLots[0]} />
              ) : (
                <span>Não há lotes programados</span>
              )}

              {scheduledLots.length > 1 && (
                <div>
                  <Separator className="my-10"/>
                  <Carousel opts={{ align: "start" }} >
                    <CarouselContent>
                      {scheduledLots.slice(1).map((lot) => (
                        <CarouselItem key={lot.id} className="basis-1/2 lg:basis-1/4">
                          <CarouselLotCard lot={lot}/>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="FINISHED">
            <div className="w-full flex flex-col gap-5">
              {finishedLots.length > 0 ? (
                <MainLotCard lot={finishedLots[0]} />
              ) : (
                <span>Não há lotes publicados Ao vivo nesse momento</span>
              )}

              {finishedLots.length > 1 && (
                <div>
                  <Separator className="my-10"/>
                  <Carousel opts={{ align: "start" }} >
                    <CarouselContent>
                      {finishedLots.slice(1).map((lot) => (
                        <CarouselItem key={lot.id} className="basis-1/2 lg:basis-1/4">
                          <CarouselLotCard lot={lot}/>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
