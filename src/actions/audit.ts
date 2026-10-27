"use server"

import { apiFetch } from "@/lib/api"
import { AuditInfo } from "@/types/audit"

export async function getLotAuditInfoAction(id: string) {
  try {
    const response = await apiFetch<AuditInfo>(`/lots/${id}/audit`)

    return { success: true, data: response }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}