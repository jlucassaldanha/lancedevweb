"use server"

import { apiFetch } from "@/lib/api"
import { MakeBid } from "@/types/bid"

export async function makeBidAction(id: string, amount: number) {
  try {
    const response = await apiFetch<MakeBid>(`/lots/${id}/bids`, {
      method: 'POST',
      body: JSON.stringify({ amount })
    })

    return { success: true, data: response };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}