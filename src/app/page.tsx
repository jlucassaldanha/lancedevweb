"use client"

import { ErrorCard } from "@/components/my-components/ErrorCard";
import { MainPageSection } from '@/components/my-components/MainPageSection';
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useListLots from "@/hooks/useListLots";

export default function Home() {
  const { 
    liveLots,
    scheduledLots,
    finishedLots, 
    isPending, 
    error 
  } = useListLots()

  if (isPending) return (
    <div className="flex w-full h-screen justify-center items-center p-10">
      <Spinner className="size-15 text-primary" />
    </div>
  ) 

  return (
    <div className='flex flex-col gap-5 px-4 md:px-10'>

      {error?.message && (
        <div className='w-full m-5'>
          <ErrorCard message={error.message} title="Busca de Lotes"/>
        </div>
      )}
      
      <div className="mb-5">
        <Tabs defaultValue="LIVE">
          <TabsList className="mb-5">
            <TabsTrigger value='LIVE'>Ao Vivo</TabsTrigger>
            <TabsTrigger value='SCHEDULED'>Programados</TabsTrigger>
            <TabsTrigger value='FINISHED'>Finalizados</TabsTrigger>
          </TabsList>

          <TabsContent value="LIVE">
            <MainPageSection 
              lotList={liveLots} 
              placeholder='Não há lotes publicados Ao vivo nesse momento'
              href='/lotes/live'
            />
          </TabsContent>

          <TabsContent value="SCHEDULED">
            <MainPageSection 
              lotList={scheduledLots} 
              placeholder='Não há lotes programados'
              href='/lotes/programados'
            />
          </TabsContent>

          <TabsContent value="FINISHED">
            <MainPageSection 
              lotList={finishedLots} 
              placeholder='Não há lotes finalizados'
              href='/lotes/finalizados'
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
