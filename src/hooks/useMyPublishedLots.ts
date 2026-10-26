import { listMyPublishedLotsAction } from '@/actions/lots';
import { PublicLot } from '@/types/lots';
import { useQuery } from '@tanstack/react-query';

export default function useMyPublishedLots() {
  const { data: lots = [], isPending: isPublishedLotsPending, error: publishedLotsError } = useQuery<PublicLot[]>({
    queryKey: ['my-published-lots'],
    queryFn: async () => await listMyPublishedLotsAction()
  })

  return {
    lots,
    isPublishedLotsPending,
    publishedLotsError
  }
}