import { Bid } from "./bid"

export type LotStatus = 'LIVE' | 'FINISHED' | 'CANCELLED' | 'SCHEDULED'

export interface PublicLot {
  id: string
  externalItemId: string
  title: string
  imageUrl: string
  startingBid: string
  minimumIncrement: string
  startTime: string
  endTime: string
  status: LotStatus
  creatorId: string
  winningBid: Bid
  _count: {
    bids:	number
  }	
}