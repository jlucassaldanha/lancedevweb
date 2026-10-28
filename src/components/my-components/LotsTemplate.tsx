import { PublicLot } from "@/types/lots"
import { Spinner } from "../ui/spinner"
import { ArrowLeftLink } from "./ArrowLeftLink"
import { CarouselLotCard } from "./CarouselLotCard"
import { ErrorCard } from "./ErrorCard"
import { LeiloeiroLotCard } from "./LeiloeiroLotCard"

interface LotsTemplateProps {
  title: string
  backLinkHref: string
  linkText: string
  isPending: boolean
  lots: PublicLot[]
  error: Error | null
  isLeiloeiro?: boolean
}

export function LotsTemplate({ title, backLinkHref, linkText, isPending, lots, error, isLeiloeiro }: LotsTemplateProps) {
  if (isPending) return (
    <div className="flex w-full h-screen justify-center items-center p-10">
      <Spinner className="size-15 text-primary" />
    </div>
  )

  return (
    <div className="flex flex-col px-10 mb-5">
      <ArrowLeftLink 
        href={backLinkHref}
        text={linkText}
      />
      
      <h2 className='text-4xl text-secondary font-bold w-full'>
        {title}
      </h2>

      {error?.message && (
        <div className='w-full m-5'>
          <ErrorCard message={error.message} title="Busca de Lotes"/>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        {lots.map((lot) => (
          <div key={lot.id}>
            {isLeiloeiro ? <LeiloeiroLotCard lot={lot}/> : <CarouselLotCard lot={lot} />}
          </div>
        ))}
      </div>
    </div>
  )
}