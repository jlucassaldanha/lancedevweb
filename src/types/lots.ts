import { Bid } from "./bid"

export type LotStatus = 'LIVE' | 'FINISHED' | 'CANCELLED' | 'SCHEDULED'

export interface PublicLot {
  id: string
  externalItemId: string
  title: string
  imageUrl: string
  artDate: string
  artistDisplayName: string
  startingBid: string
  minimumIncrement: string
  startTime: string
  endTime: string
  status: LotStatus
  creatorId: string
  winningBid: Bid
  bids: Bid[]
  _count: {
    bids:	number
  }	
}

export interface SimpleLot {
  id: string
  title: string
  imageUrl: string
  artDate: string
  artistDisplayName: string
  startingBid: string
  minimumIncrement: string
  startTime: string
  endTime: string
  status: LotStatus
}

export interface LotReceipt {
  lotId: string
  title: string
  imageUrl: string
  artDate: string
  artistDisplayName: string
  amount?: string,
  closedAt: string,
  winnerName?: string
  message?: string
}

export interface BidsHistory {
  id: string,
  amount: string,
  createdAt: string,
  bidderName: string,
  isUserBid: boolean
}

export interface LiveLot {
  serverTime: string
  lot: SimpleLot
  currentLeader?: {
    amount: string,
    bidderName: string
  },
  userStatus: {
    isWinning: boolean
  },
  bidsHistory: BidsHistory[]
}

export interface MyWinning {
  lotId: string
  title: string
  imageUrl: string
  amount: string
  closedAt: string
  receipt: {
    lotId: string
    title: string
    amount: string
    closedAt: string
    winnerId: string
  }
}

export interface CancelLotResponse {
  message: string
}

export interface CreateLot {
  externalItemId: string
  startingBid: number
  minimumIncrement: number
  startTime: string
  endTime: string
}

export interface CreateLotResponse {
  message: string
  lot: PublicLot
}