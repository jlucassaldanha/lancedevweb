import { listMyLiveLotsAction } from '@/actions/lots';
import { PublicLot } from '@/types/lots';
import { useQuery } from '@tanstack/react-query';

export default function useMyLiveLots() {
  const { data: lots = [], isPending: isLiveLotsPending, error: liveLotsError } = useQuery<PublicLot[]>({
    queryKey: ['my-live-lots'],
    queryFn: async () => {
      const response = await listMyLiveLotsAction()
      
      if (!response.data) {
        throw new Error(response.message)
      }

      return response.data
    }
  })

  return {
    lots,
    isLiveLotsPending,
    liveLotsError
  }
}