"use server"

import { apiFetch } from "@/lib/api"
import { WalletValues } from "@/types/wallet"

export async function getWalletValuesAction() {
  try {
    return await apiFetch<WalletValues>('/wallet')
  } catch (error) {
    console.error('Erro tentando ler a carteira:', error)
    throw error
  }
}