import { getLotAuditInfoAction } from "@/actions/audit";
import { getReceiptByIdAction } from "@/actions/lots";
import { AuditInfo } from "@/types/audit";
import { LotReceipt } from "@/types/lots";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useReceipt() {
  const { id } = useParams() as { id: string };
  
  const { data: receiptData, isPending: isPendingReceipt, error: receiptError } = useQuery<LotReceipt>({
    queryKey: ['lot-receipt', id],
    queryFn: async () => {
      const response = await getReceiptByIdAction(id)
      
      if (!response.data) {
        throw new Error(response.message)
      }

      return response.data
    }
  })

  const { data: auditData, isPending: isPendingAudit, error: auditError } = useQuery<AuditInfo>({
    queryKey: ['audit-lot', id],
    queryFn: async () => {
      const response = await getLotAuditInfoAction(id)
    
      if (!response.data) {
        throw new Error(response.message)
      }

      return response.data
    }
  })

  const isPending = isPendingAudit || isPendingReceipt

  return {
    receiptData,
    receiptError,
    auditData,
    auditError,
    isPending
  }
}