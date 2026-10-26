"use server"

import { apiFetch } from "@/lib/api"
import { LiveLot, LotReceipt, MyWinning, PublicLot } from "@/types/lots"

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

export async function getLiveRoomStatusByIdAction(id: string) {
  try {
    return await apiFetch<LiveLot>(`/lots/${id}/live-room`)
  } catch (error) {
    console.error('Erro ao obter dados da sessão ao vivo:', error)
    throw error
  }
}

export async function listMyWinningsAction() {
  try {
    return await apiFetch<MyWinning[]>('/lots/my-winnings')
  } catch (error) {
    console.error('Erro ao obter lista de arremates:', error)
    throw error
  }
}

export async function listMyLiveLotsAction() {
  try {
    return await apiFetch<PublicLot[]>('/lots/my-live-lots')
  } catch (error) {
    console.error('Erro ao obter lista de lotes ao vivo do usuário:', error)
    throw error
  }
}