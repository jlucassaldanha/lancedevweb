import { getLotAuditInfoAction } from "@/actions/audit";
import { AuditInfo } from "@/types/audit";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function useAudit() {
  const { id } = useParams() as { id: string };

  const { data, isPending, isError, error } = useQuery<AuditInfo>({
    queryKey: ['audit-lot', id],
    queryFn: async () => await getLotAuditInfoAction(id)
  })

  return {
    data,
    isPending,
    isError, 
    error
  }
}