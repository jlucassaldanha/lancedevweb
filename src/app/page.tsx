"use client"

import { MainLotCard } from "@/components/my-components/MainLotCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useListLots from "@/hooks/useListLots";
import Image from "next/image";

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
    <div className='flex flex-col gap-5 p-10'>
      
      <div>
        <Tabs defaultValue="LIVE">
          <TabsList>
            <TabsTrigger value='LIVE'>Ao Vivo</TabsTrigger>
            <TabsTrigger value='SCHEDULED'>Programados</TabsTrigger>
            <TabsTrigger value='FINISHED'>Finalizados</TabsTrigger>
          </TabsList>

          <TabsContent value="LIVE">
            {liveLots.map((lot) => (
              <div key={lot.id}>
                {lot.title}
                <Image 
                  src={lot.imageUrl}
                  alt={lot.title}
                  width={400}
                  height={400}
                />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="SCHEDULED">
            {scheduledLots.map((lot) => (
              <div key={lot.id}>
                {lot.title}
                <Image 
                  src={lot.imageUrl}
                  alt={lot.title}
                  width={400}
                  height={400}
                />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="FINISHED">
            <div className="w-full flex flex-col gap-5 mt-5">
              <MainLotCard lot={finishedLots[0]} />

              <Separator className="mt-10"/>
              <div>
                <Carousel
                  opts={{
                    align: "start"
                  }}
                >
                  <CarouselContent>
                    {finishedLots.slice(1).map((lot) => (
                      <CarouselItem key={lot.id} className="basis-1/2 lg:basis-1/3">
                        {lot.title}
                        <Image 
                          src={lot.imageUrl}
                          alt={lot.title}
                          width={400}
                          height={400}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              
            </div>
            
          </TabsContent>
        </Tabs>
      </div>
      
    </div>
  );
}
