"use server"

import { apiFetch } from "@/lib/api"
import { AuditInfo } from "@/types/audit"

export async function getLotAuditInfoAction(id: string) {
  try {
    return await apiFetch<AuditInfo>(`/lots/${id}/audit`)
  } catch (error) {
    console.error('Erro tentando auditar Lote:', error)
    throw error
  }
}