"use client"

import { ErrorCard } from '@/components/my-components/ErrorCard';
import { MetArtCard } from '@/components/my-components/MetArtCard';
import { Button } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import useCreateLot from '@/hooks/useCreateLot';
import useSearchMet from '@/hooks/useSearchMet';
import { MetObj } from '@/types/met';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';

export default function PublicarLotesPage() {
  useAuthRedirect('LEILOEIRO')

  const {
    isFetching,
    error,
    metArts,
    control,
    handleSubmit: handleSearchSubmit,
    onSubmit: onSearchSubmit,
    clearSearch
  } = useSearchMet()

  const [selectedArt, setSelectedArt] = useState<MetObj | null>(null);

  const { control: createControl, handleSubmit: handleCreateSubmit, setValue, onSubmit: onCreateSubmit, formErrors, isPending, isSuccess, error: createError } = useCreateLot()

  const handleSelectArt = (art: MetObj) => {
    setSelectedArt(art)

    setValue('externalItemId', String(art.objectID), { shouldValidate: true });

    clearSearch()

    createLotSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const createLotSectionRef = useRef<HTMLElement>(null)

  return (
    <div className="flex flex-col px-10 mb-5">
      <div>
        <Link href="/dashboard/leiloeiro" className="flex gap-2 mb-5">
          <ArrowLeftIcon />
          Voltar ao Dashboard
        </Link>
      </div>
      
      <div className='text-4xl text-secondary font-bold w-full'>
        Publicar Novos Lotes
      </div>

      <div className='mt-10'>
        <form onSubmit={handleSearchSubmit(onSearchSubmit)} className='flex gap-5 items-end'>
          <Controller 
            name="searchQuery"
            control={control}
            render={({ field, fieldState }) => (
              <Field className='w-full'>
                <Label htmlFor='search-query'>Procurar no The Met</Label>
                <Input 
                  {...field}
                  id="search-query" 
                  aria-invalid={fieldState.invalid}
                  placeholder='Arte, Autor, etc...'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit">Pesquisar</Button>
        </form>
      </div>

      {error?.message && (
        <div className='w-full m-5'>
          <ErrorCard message={error.message} title="Busca de Artes"/>
        </div>
      )}

      <div className='my-5 w-full'>
        {isFetching ? (
          <div className='w-full flex justify-center'>
            <Spinner className="size-10 text-primary"/>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3'>
            {metArts.map((art) => (
              <div key={art.objectID}>
                <MetArtCard art={art} onSelectArt={handleSelectArt} isSearch/>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-5"/>

      <section
        ref={createLotSectionRef}
      >
        <span className='text-3xl font-bold text-secondary'>Criar novo Lote</span>

        {selectedArt && (
          <div className="mb-8 md:w-1/2 lg:w-1/3">
            <span className='text-lg font-bold text-primary'>Arte selecionada:</span>
            <MetArtCard art={selectedArt}/>
          </div>
        )}

        <form onSubmit={handleCreateSubmit(onCreateSubmit)} className="mt-10">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <Controller
              name="startingBid"
              control={createControl}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="startingBid">Lance Inicial (R$)</Label>
                  <Input
                    {...field}
                    id="startingBid"
                    type="number"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="minimumIncrement"
              control={createControl}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="minimumIncrement">Incremento Mínimo (R$)</Label>
                  <Input
                    {...field}
                    id="minimumIncrement"
                    type="number"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="startTime"
              control={createControl}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="startTime">Data de Início</Label>
                  <Input
                    {...field}
                    id="startTime"
                    type="datetime-local"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="endTime"
              control={createControl}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="endTime">Data de Encerramento</Label>
                  <Input
                    {...field}
                    id="endTime"
                    type="datetime-local"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          {createError?.message && (
            <div className='w-full m-5'>
              <ErrorCard message={createError.message} title="Erro"/>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isPending} 
            className="w-full mt-6 bg-primary text-primary-foreground"
          >
            {isPending ? "Publicando Lote..." : "Publicar Lote"}
          </Button>
          
        </form>

        {isSuccess && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md font-bold text-center border border-green-200">
            Lote Criado com Sucesso!
          </div>
        )}
      </section>
    </div>
  )
}