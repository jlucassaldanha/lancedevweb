"use server"

import { apiFetch } from '@/lib/api'
import { MetObj } from '@/types/met'

export async function searchArtAction(query: string) {
  const params = new URLSearchParams({
    q: query
  })

  try {
    return await apiFetch<MetObj[]>(`/lots/search?${params.toString()}`)
  } catch (error) {
    console.error('Erro ao obter dados da sessão ao vivo:', error)
    throw error
  }
}