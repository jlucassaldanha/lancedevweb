"use server"

import { apiFetch } from "@/lib/api"
import { DepositResponse, WalletValues } from "@/types/wallet"

export async function getWalletValuesAction() {
  try {
    const response = await apiFetch<WalletValues>('/wallet')

    return { success: true, data: response }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}

export async function makeDepositAction(amount: number) {
  try {
    const response = await apiFetch<DepositResponse>('/wallet/deposit', {
      method: 'POST',
      body: JSON.stringify({ amount })
    })

    return { success: true, data: response }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}