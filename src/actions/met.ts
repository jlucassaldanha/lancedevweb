"use server"

import { apiFetch } from '@/lib/api'
import { MetObj } from '@/types/met'

export async function searchArtAction(query: string) {
  const params = new URLSearchParams({
    q: query
  })

  try {
    const response = await apiFetch<MetObj[]>(`/lots/search?${params.toString()}`)

    return { success: true, data: response }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}