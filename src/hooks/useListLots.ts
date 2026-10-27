import { listPublicLotsActions } from "@/actions/lots";
import { PublicLot } from "@/types/lots";
import { useQuery } from "@tanstack/react-query";

export default function useListLots() {
  const { data: lots = [], isPending, isError, error } = useQuery<PublicLot[]>({
    queryKey: ['public-lots'],
    queryFn: async () => {
      const response = await listPublicLotsActions()
      
      if (!response.data) {
        throw new Error(response.message)
      }

      return response.data
    }
  })
  
  const liveLots = lots.filter((lot) => lot.status === 'LIVE')
  const scheduledLots = lots.filter((lot) => lot.status === 'SCHEDULED')
  const finishedLots = lots.filter((lot) => lot.status === 'FINISHED')

  return {
    liveLots,
    scheduledLots,
    finishedLots,
    isPending,
    isError,
    error
  }
}