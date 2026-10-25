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
    queryFn: async () => await getReceiptByIdAction(id)
  })

  const { data: auditData, isPending: isPendingAudit, error: auditError } = useQuery<AuditInfo>({
    queryKey: ['audit-lot', id],
    queryFn: async () => await getLotAuditInfoAction(id)
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