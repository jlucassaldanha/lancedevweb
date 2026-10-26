import { makeBidAction } from '@/actions/bid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';;
import z from 'zod';

const formSchema = z.object({
  amount: z.number().min(1, 'Você deve escolher um valor maior que zero para o lance'),
})

export type BidFormData = z.infer<typeof formSchema>

export default function useMakeBid() {
  const { id } = useParams() as { id: string };

  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: BidFormData) => makeBidAction(id, data.amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['make-bid'] })
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