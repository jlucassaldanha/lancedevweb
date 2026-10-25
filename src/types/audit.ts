export interface AuditInfo {
  lotId: string
  lotTitle: string
  lotImageUrl: string
  totalBids: number
  isIntegrityIntact: boolean
  auditDetails: AuditDetails[]
}

export interface AuditDetails {
  id: string
  amount: string
  createdAt: Date
  storedHash: string
  calculatedHash: string
  previousHash: string
  isValid: boolean
  bidderName: string
}