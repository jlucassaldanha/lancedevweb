import { searchArtAction } from '@/actions/met';
import { MetObj } from '@/types/met';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const formSchema = z.object({
  searchQuery: z.string().min(1, "O campo de pesquisa não pode estar vazio.")
})

export type SearchFormData = z.infer<typeof formSchema>

export default function useSearchMet() {
  const [submittedSearch, setSubmittedSearch] = useState('')

  const { control, handleSubmit, reset } = useForm<SearchFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: ''
    }
  })

  const { data: metArts = [], isFetching, error } = useQuery<MetObj[]>({
    queryKey: ['met-search', submittedSearch],
    queryFn: async () => {
      if (!submittedSearch) return []
      return await searchArtAction(submittedSearch)
    },
    enabled: submittedSearch.length > 0
  })

  const onSubmit = (data: SearchFormData) => {
    setSubmittedSearch(data.searchQuery)
  }

  const clearSearch = () => {
    setSubmittedSearch('')
    reset()
  }

  return {
    isFetching,
    error,
    metArts,
    control,
    handleSubmit,
    onSubmit,
    clearSearch
  }
}