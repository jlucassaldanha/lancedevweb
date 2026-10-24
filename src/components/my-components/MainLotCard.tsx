import { PublicLot } from "@/types/lots";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export function MainLotCard({ lot }: { lot: PublicLot }) {
  const status = lot.status === "LIVE" 
    ? 'Ao Vivo' : lot.status === "FINISHED" 
    ? 'Finalizado' : 'Programado'

  return (
    <div className="w-full flex gap-14">
      <div className="flex flex-col gap-5">
        {lot.status === 'LIVE' && <Badge>Ao vivo</Badge>}
        <Image 
          src={lot.imageUrl}
          alt={lot.title}
          width={600}
          height={600}
        />
      </div>

      <div className="flex flex-col gap-5 w-2/4">
        <span className="text-5xl">{lot.title}</span>
        <Separator />
        <div className="flex flex-col justify-between h-full">
          <Badge variant="secondary">{status}</Badge>


          <div className="flex gap-10 items-center">
            <div className="flex flex-col gap-2"> 
              <span>Lance Inicial</span>
              <span className="text-2xl">R$ {Number(lot.startingBid).toFixed(2)}</span>
            </div>

            <div className="flex flex-col gap-2"> 
              <span>Incremento minimo</span>
              <span>R$ {Number(lot.minimumIncrement).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-10">
          {lot.status === "FINISHED" && <Button>Ver Ao Vivo</Button>}
          <Button variant="outline">Ver Laudo</Button>
        </div>
      </div>
    </div>
  )
}