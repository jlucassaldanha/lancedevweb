import {  Controller } from 'react-hook-form';
import { Field, FieldError } from '../ui/field';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import useMakeBid from '@/hooks/useMakeBid';

interface MakeBidFormProps {
  avaliableBalance: string
}

export function MakeBidForm({ avaliableBalance }: MakeBidFormProps) {
  const { control, isPending, error, handleSubmit, onSubmit } = useMakeBid()

  return(
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-xl">Dar um Lance</h3>
      <div className="flex flex-col md:flex-row gap-5 items-center">
        <div className="w-full md:w-1/4 flex flex-col gap-2">
          <form id="bid-form" onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Controller 
              name='amount'
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor='amount'>Quantia</Label>
                  <Input 
                    {...field}
                    id="amount" 
                    aria-invalid={fieldState.invalid}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === '' ? undefined : Number(val));
                    }} 
                    placeholder='Valor do lance'
                    type='number'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </form>
          <Button 
            type='submit' 
            form='bid-form' 
            disabled={isPending}
          >
            {isPending ? "Fazendo lance..." : "Fazer Lance"}
          </Button>
        </div>

        <div className="w-full flex flex-col">
          Valor disponível <span className="font-serif text-secondary">R$ {avaliableBalance}</span>
        </div>
      </div>

      {error?.message && (
        <div className='flex mt-2'>
          <Alert className='text-red-400'>
            <AlertCircleIcon />
            <AlertTitle>Lance não realizado</AlertTitle>
            <AlertDescription className='text-red-400'>
              {error.message}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}