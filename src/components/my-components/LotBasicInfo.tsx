import { PublicLot } from '@/types/lots';
import { CountdownTimer } from './CountdownTimer';
import { Bubble, BubbleContent } from '../ui/bubble';

interface LotsBasicInfoProps { lot: PublicLot, status: string }

export function LotBasicInfo({ lot, status }: LotsBasicInfoProps) {
  return (
    <div className="flex flex-col justify-between h-full gap-2">
      {lot.status === 'LIVE' && <CountdownTimer endTime={lot.endTime}/>}
      
      <div className="flex gap-3 items-center">
        <Bubble variant={lot.status === 'FINISHED' ? "muted" : lot.status === 'LIVE' ? "default" : lot.status === 'CANCELLED' ? "destructive" : "secondary"}>
          <BubbleContent>
            {status}
          </BubbleContent>
        </Bubble>

        {(lot.bids.length > 0 && lot.status === 'FINISHED') && (
          <Bubble>
            <BubbleContent>
              Arrematado
            </BubbleContent>
          </Bubble>
        )}
      </div>

      <div className="flex gap-10 items-center">
        {lot.bids.length > 0 ? (
            <div className="flex flex-col gap-2"> 
              <span>{lot.status === 'FINISHED' ? "Lance Vencedor" : "Maior Lance"}</span>
              <span className="text-xl font-serif text-primary">R$ {Number(lot.bids[0].amount).toFixed(2).replace('.', ',')}</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2"> 
              <span>Lance Inicial</span>
              <span className="text-xl font-serif text-primary">R$ {Number(lot.startingBid).toFixed(2).replace('.', ',')}</span>
            </div>
          )}

        <div className="flex flex-col gap-2"> 
          <span>Incremento</span>
          <span className="font-serif text-primary">R$ {Number(lot.minimumIncrement).toFixed(2).replace('.', ',')}</span>
        </div>
      </div>
    </div>
  )
}