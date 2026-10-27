import { makeBidAction } from '@/actions/bid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';;
import z from 'zod';

const formSchema = z.object({
  amount: z.number('Você deve digitar um valor no campo').min(1, 'Você deve escolher um valor maior que zero para o lance'),
})

export type BidFormData = z.infer<typeof formSchema>

export default function useMakeBid() {
  const { id } = useParams() as { id: string };

  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: BidFormData) => {
      const response = await makeBidAction(id, data.amount)

      if (!response.data) {
        throw new Error(response.message)
      }

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet-values', 'live-lot'] })
    }
  })

  const { register, handleSubmit, control, reset } = useForm<BidFormData>({
    resolver: zodResolver(formSchema)
  })


  function onSubmit(data: BidFormData) {
    mutate({ amount: data.amount })
    reset()
  }

  return {
    control,
    isPending,
    error,
    handleSubmit,
    onSubmit,
    register
  }
}