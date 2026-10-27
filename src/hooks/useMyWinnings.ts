import { listMyWinningsAction } from '@/actions/lots';
import { MyWinning } from '@/types/lots';
import { useQuery } from '@tanstack/react-query';

export default function useMyWinnings() {
  const { data: winnings = [], isPending, error } = useQuery<MyWinning[]>({
    queryKey: ['my-winnings'],
    queryFn: async () => {
      const response = await listMyWinningsAction()
    
      if (!response.data) {
        throw new Error(response.message)
      }

      return response.data
    }
  })

  return {
    winnings,
    isPending,
    error
  }
}