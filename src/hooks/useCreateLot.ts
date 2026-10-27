import { createLotAction } from '@/actions/lots';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod';

const createLotSchema = z.object({
  externalItemId: z.string().min(1, "Obrigatório"),
  title: z.string().min(1, "Obrigatório"),
  imageUrl: z.string().min(1, "Obrigatório"),
  startingBid: z.number().min(1, "O lance inicial deve ser maior que zero"),
  minimumIncrement: z.number().min(1, "O incremento mínimo deve ser maior que zero"),
  startTime: z.string().min(1, "Data de início obrigatória"),
  endTime: z.string().min(1, "Data de encerramento obrigatória"),
});

export type CreateLotFormData = z.infer<typeof createLotSchema>;

export default function useCreateLot() {
  const queryClient = useQueryClient();
  
  const { control, handleSubmit, setValue, watch, formState: { errors: formErrors }, reset } = useForm<CreateLotFormData>({
    resolver: zodResolver(createLotSchema),
    defaultValues: {
      externalItemId: '',
      title: '',
      imageUrl: '',
    }
  });

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: createLotAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-published-lots'] });
      reset();
    }
  });

  const onSubmit = (data: CreateLotFormData) => {
    mutate(data);
  };

  return { control, handleSubmit, setValue, watch, onSubmit, formErrors, isPending, isSuccess, error };
}