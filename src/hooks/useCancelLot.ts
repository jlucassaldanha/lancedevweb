import { cancelLotAction } from "@/actions/lots"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useCancelLot() {
  const queryClient = useQueryClient()
  
  const { mutate, isPending, error } = useMutation({
    mutationFn: (id: string) => cancelLotAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-published-lots'] })
    }
  })

  return {
    mutate,
    isPending,
    error
  }
}