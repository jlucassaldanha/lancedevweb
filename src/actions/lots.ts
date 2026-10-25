"use server"

import { apiFetch } from "@/lib/api"
import { LotReceipt, PublicLot } from "@/types/lots"

export async function listPublicLotsActions() {
  try {
    return await apiFetch<PublicLot[]>('/lots')
  } catch (error) {
    console.error('Erro tentando listar Lotes:', error)
    throw error
  }
}

export async function getPublicLotByIdActions(id: string) {
  try {
    return await apiFetch<PublicLot>(`/lots/${id}`)
  } catch (error) {
    console.error('Erro tentando buscar Lote:', error)
    throw error
  }
}

export async function getReceiptByIdAction(id: string) {
  try {
    return await apiFetch<LotReceipt>(`/lots/${id}/receipt`)
  } catch (error) {
    console.error('Erro tentando listar Lotes:', error)
    throw error
  }
}