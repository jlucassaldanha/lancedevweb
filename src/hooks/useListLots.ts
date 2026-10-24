import { listPublicLotsActions } from "@/actions/lots";
import { PublicLot } from "@/types/lots";
import { useQuery } from "@tanstack/react-query";

export default function useListLots() {
  const { data: lots = [], isPending, isError } = useQuery<PublicLot[]>({
    queryKey: ['public-lots'],
    queryFn: async () => await listPublicLotsActions()
  })

  return {
    lots,
    isPending,
    isError
  }
}