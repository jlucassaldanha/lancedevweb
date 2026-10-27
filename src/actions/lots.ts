"use server"

import { apiFetch } from "@/lib/api"
import { CancelLotResponse, CreateLot, CreateLotResponse, LiveLot, LotReceipt, MyWinning, PublicLot } from "@/types/lots"

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

export async function listMyPublishedLotsAction() {
  try {
    return await apiFetch<PublicLot[]>('/lots/my-lots')
  } catch (error) {
    console.error('Erro ao obter lista de lotes publicados do usuário:', error)
    throw error
  }
}

export async function cancelLotAction(id: string) {
  try {
    return await apiFetch<CancelLotResponse>(`/lots/${id}`, {
      method: 'PATCH'
    })
  } catch (error) {
    console.error('Erro ao tentar fazer deposito:', error)
    throw error
  }
}

export async function createLotAction(data: CreateLot) { 
  const payload = {
    ...data,
    startTime: new Date(data.startTime).toISOString(),
    endTime: new Date(data.endTime).toISOString()
  }

  console.log(payload)

  try {
    return await apiFetch<CreateLotResponse>('/lots', {
      method: 'POST',
      body: JSON.stringify({ payload })
    })
  } catch (error) {
    console.error('Erro ao tentar criar lote:', error)
    throw error
  }
}