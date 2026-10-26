"use server"

import { apiFetch } from "@/lib/api"
import { DepositResponse, WalletValues } from "@/types/wallet"

export async function getWalletValuesAction() {
  try {
    return await apiFetch<WalletValues>('/wallet')
  } catch (error) {
    console.error('Erro tentando ler a carteira:', error)
    throw error
  }
}

export async function makeDepositAction(amount: number) {
  try {
    return await apiFetch<DepositResponse>('/wallet/deposit', {
      method: 'POST',
      body: JSON.stringify({ amount })
    })
  } catch (error) {
    console.error('Erro ao tentar fazer deposito:', error)
    throw error
  }
}