"use client"

import { ErrorCard } from '@/components/my-components/ErrorCard';
import { MetArtCard } from '@/components/my-components/MetArtCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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

  const [selectedArt, setSelectedArt] = useState<MetObj | null>(null)

  const {
    isFetching,
    error,
    metArts,
    control,
    handleSubmit: handleSearchSubmit,
    onSubmit: onSearchSubmit,
    clearSearch
  } = useSearchMet()


  const { 
    control: createControl,
    handleSubmit: handleCreateSubmit, 
    setValue, 
    onSubmit: onCreateSubmit, 
    formErrors, 
    isPending, 
    isSuccess, 
    error: createError 
  } = useCreateLot()

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
        <form onSubmit={handleSearchSubmit(onSearchSubmit)} className='flex flex-col md:flex-row gap-5 items-end'>
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

      <section
        ref={createLotSectionRef}
      >
        <Separator className="my-5"/>
        
        <span className='text-3xl font-bold text-secondary'>Criar novo Lote</span>

        {!selectedArt && (
          <div className='mt-5'> 
            <span>Pesquise e selecione uma Arte para criar um Lote</span>
          </div>  
        )}

        {selectedArt && (
          <div className='flex flex-col md:flex-row w-full gap-10'>
            <div className='flex flex-col md:w-1/2'>
          
              <div className="mb-8">
                <span className='text-lg font-bold text-primary'>Arte selecionada:</span>
                <MetArtCard art={selectedArt}/>
              </div>
            </div>
            
            <div className='flex flex-col w-full'>
              <form onSubmit={handleCreateSubmit(onCreateSubmit)} className="mt-10 w-full">
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

                {formErrors?.externalItemId && (
                  <div className='w-full m-5'>
                    <ErrorCard message="Selecione uma arte para publicar" title="Erro"/>
                  </div>
                )}

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
                <Alert className="text-green-400 mt-5">
                  <AlertTitle>Sucesso!</AlertTitle>
                  <AlertDescription  className="text-green-400">
                    Lote Criado com Sucesso!
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
              
        )}
      </section>
    </div>
  )
}