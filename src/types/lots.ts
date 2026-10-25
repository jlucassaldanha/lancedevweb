import { string } from "zod"
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
  bids: Bid[]
  _count: {
    bids:	number
  }	
}

export interface LotReceipt {
  lotId: string
  title: string
  imageUrl: string
  amount?: string,
  closedAt: string,
  winnerName?: string
  message?: string
}

export interface LiveLot {
  serverTime: string
  lot: {
    id: string
    title: string
    imageUrl: string
    startingBid: string
    minimumIncrement: string
    startTime: string
    endTime: string
    status: LotStatus
  },
  currentLeader?: {
    amount: string,
    bidderName: string
  },
  userStatus: {
    isWinning: boolean
  },
  bidsHistory: 
    {
      id: string,
      amount: string,
      createdAt: string,
      bidderName: string,
      isUserBid: boolean
    }[]
  
}