"use server"

import { apiFetch } from "@/lib/api"
import { MakeBid } from "@/types/bid"

export async function makeBidAction(id: string, amount: number) {
  try {
    return await apiFetch<MakeBid>(`/lots/${id}/bids`, {
      method: 'POST',
      body: JSON.stringify({ amount })
    })
  } catch (error) {
    console.error('Erro ao tentar fazer lance:', error)
    throw error
  }
}