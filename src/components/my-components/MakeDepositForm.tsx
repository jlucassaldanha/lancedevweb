import { Controller } from 'react-hook-form';
import { Field, FieldError } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import useMakeDeposit from '@/hooks/useMakeDeposit';

export function MakeDepositForm() {
  const { control, isPending, error, handleSubmit, onSubmit } = useMakeDeposit()

  return(
    <div className="flex flex-col gap-2 mt-5">
      <div className="flex flex-col md:flex-row gap-5 items-center">
        <div className="w-full flex flex-col gap-2">
          <form id="bid-form" onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Controller 
              name='amount'
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input 
                    {...field}
                    id="amount" 
                    aria-invalid={fieldState.invalid}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === '' ? undefined : Number(val));
                    }} 
                    placeholder='Valor do deposito'
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
            {isPending ? "Fazendo Deposito..." : "Fazer Deposito"}
          </Button>
        </div>
      </div>

      {error?.message && (
        <div className='flex mt-2'>
          <Alert className='text-red-400'>
            <AlertCircleIcon />
            <AlertTitle>Deposito não realizado</AlertTitle>
            <AlertDescription className='text-red-400'>
              {error.message}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}