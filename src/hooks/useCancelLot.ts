import { cancelLotAction } from "@/actions/lots"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useCancelLot() {
  const queryClient = useQueryClient()
  
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (id: string) => {
      const response = await cancelLotAction(id)
      
      if (!response.data) {
        throw new Error(response.message)
      }

      return response.data
    },
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