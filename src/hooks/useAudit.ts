import { getLotAuditInfoAction } from "@/actions/audit";
import { getPublicLotByIdActions } from "@/actions/lots";
import { AuditInfo } from "@/types/audit";
import { PublicLot } from "@/types/lots";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function useAudit() {
  const { id } = useParams() as { id: string };

  const { data: auditData, isPending: isAuditPending, error: auditError } = useQuery<AuditInfo>({
    queryKey: ['audit-lot', id],
    queryFn: async () => await getLotAuditInfoAction(id)
  })

  const { data: lotData, isPending: isLotDataPending, error: lotDataError } = useQuery<PublicLot>({
    queryKey: ['lot-data', id],
    queryFn: async () => await getPublicLotByIdActions(id)
  })

  const isPending = isAuditPending || isLotDataPending

  return {
    auditData,
    lotData,
    isPending,
    auditError,
    lotDataError
  }
}