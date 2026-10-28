import { BidsHistory } from "@/types/lots";

export function BidCard({ bid, position, isUserLatestBid }: { bid: BidsHistory, position: number, isUserLatestBid: boolean }) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1 w-full">
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-2">
            <h4 className="text-2xl font-bold text-secondary font-serif">#{position} • {bid.bidderName}</h4>
            <h4 className="text-primary font-extrabold text-2xl"> {isUserLatestBid && " Você está aqui!"}</h4>
          </div>
          <span className="text-2xl font-serif">R$ {Number(bid.amount).toFixed(2).replace('.', ',')}</span>
        </div>
      </div>
    </div>
  )
}