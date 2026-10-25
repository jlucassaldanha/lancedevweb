import { AuditDetails } from "@/types/audit"

interface AuditCardProps {
  comprovante?: boolean
  audit?: AuditDetails
  position?: number
}

export function AuditCard({ comprovante, audit, position }: AuditCardProps) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        {!comprovante && (<span className="text-2xl">#{position} - {audit?.bidderName}</span>)}
        
        <div>
          Status: 
          <span className={"flex " + audit?.isValid ? "text-green-400" : 'text-red-400'}>
            {audit?.isValid ? ' Integro' : ' Fraudado'}
          </span>
        </div>
        <span>Hash Anterior: {audit?.previousHash}</span>
        <span>Hash: {audit?.storedHash}</span>
        <span>Hash Calculada: {audit?.calculatedHash}</span>
      </div>
      <span className="text-2xl">R$ {Number(audit?.amount).toFixed(2)}</span>
    </div>
  )
}