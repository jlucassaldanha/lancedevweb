"use server"

import { apiFetch } from "@/lib/api"
import { CancelLotResponse, CreateLot, CreateLotResponse, LiveLot, LotReceipt, MyWinning, PublicLot } from "@/types/lots"

export async function listPublicLotsActions() {
  try {
    const response = await apiFetch<PublicLot[]>('/lots')

    return { success: true, data: response }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}

export async function getPublicLotByIdActions(id: string) {
  try {
    const response = await apiFetch<PublicLot>(`/lots/${id}`)

    return { success: true, data: response }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}

export async function getReceiptByIdAction(id: string) {
  try {
    const response = await apiFetch<LotReceipt>(`/lots/${id}/receipt`)

    return { success: true, data: response }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}

export async function getLiveRoomStatusByIdAction(id: string) {
  try {
    const response = await apiFetch<LiveLot>(`/lots/${id}/live-room`)

    return { success: true, data: response }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}

export async function listMyWinningsAction() {
  try {
    const response = await apiFetch<MyWinning[]>('/lots/my-winnings')

    return { success: true, data: response }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}

export async function listMyLiveLotsAction() {
  try {
    const response = await apiFetch<PublicLot[]>('/lots/my-live-lots')

    return { success: true, data: response }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}

export async function listMyPublishedLotsAction() {
  try {
    const response = await apiFetch<PublicLot[]>('/lots/my-lots')

    return { success: true, data: response }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}

export async function cancelLotAction(id: string) {
  try {
    const response = await apiFetch<CancelLotResponse>(`/lots/${id}`, {
      method: 'PATCH'
    })

    return { success: true, data: response }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}

export async function createLotAction(data: CreateLot) { 
  const payload = {
    ...data,
    startTime: new Date(data.startTime).toISOString(),
    endTime: new Date(data.endTime).toISOString()
  }

  try {
    const response = await apiFetch<CreateLotResponse>('/lots', {
      method: 'POST',
      body: JSON.stringify(payload)
    })

    return { success: true, data: response }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}