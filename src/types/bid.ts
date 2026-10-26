export interface Bid {
  id: string,
  amount: string,
  createdAt: string,
  lotId: string,
  bidderId: string,
  hash: string,
  previousHash: string
}

export interface MakeBid {
  message?: string
  success?: string
  error?: string
}