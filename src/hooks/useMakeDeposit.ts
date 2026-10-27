import { makeDepositAction } from '@/actions/wallet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'

const formSchema = z.object({
  amount: z.number('Você deve digitar um valor no campo').min(1, 'Você deve escolher um valor maior que zero para o deposito'),
})

export type DepositFormData = z.infer<typeof formSchema>

export default function useMakeDeposit() {
  const queryClient = useQueryClient()
  
    const { mutate, isPending, error } = useMutation({
      mutationFn: (data: DepositFormData) => makeDepositAction(data.amount),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['wallet-values'] })
      }
    })
  
    const { register, handleSubmit, control, reset } = useForm<DepositFormData>({
      resolver: zodResolver(formSchema)
    })
  
  
    function onSubmit(data: DepositFormData) {
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