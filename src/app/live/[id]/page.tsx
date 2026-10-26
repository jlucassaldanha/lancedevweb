"use client"

import { BidCard } from "@/components/my-components/BidCard";
import { LiveLotCard } from "@/components/my-components/LiveLotCard";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import useLiveLot from "@/hooks/useLiveLot";
import useMakeBid from "@/hooks/useMakeBid";
import useWalletValues from "@/hooks/useWalletValues";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Controller } from "react-hook-form";

export default function LivePage() {
  useAuthRedirect('LICITANTE')
  
  const { liveData, isLivePending, liveError } = useLiveLot()

  const { control, isPending, error, handleSubmit, onSubmit, register } = useMakeBid()

  const {
    walletValues,
    isWalletPending,
    walletError
  } = useWalletValues()

  const isPagePending = isPending || isLivePending || isWalletPending

  if (isPagePending) return (
    <div className="flex w-full h-screen justify-center items-center p-10">
      <Spinner className="size-15 text-primary" />
    </div>
  )
  
  return (
    <div className="flex flex-col px-4 md:px-10 mb-5 gap-5">
      <div>
        <Link href="/" className="flex gap-2 mb-5">
          <ArrowLeftIcon />
          Voltar ao Lotes
        </Link>
      </div>

      <LiveLotCard 
        liveLot={liveData}
      />

      {!liveData?.userStatus.isWinning && (
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">Dar um Lance</span>
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <div className="w-full flex flex-col gap-2">
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
                        {...register("amount", { valueAsNumber: true })} 
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
              <Button type='submit' form='bid-form'>Fazer Lance</Button>
            </div>

            <div className="w-full flex flex-col">Valor disponível <span className="font-serif text-secondary">R$ {Number(walletValues?.availableBalance).toFixed(2)}</span></div>
          </div>

          <div>
            <span>{error?.message}</span>
          </div>
          
        </div>
        
      )}

      {(liveData?.bidsHistory.length ?? 0) > 0 ? (
        <div className="mt-5 flex flex-col gap-5">
          <span className="text-2xl font-extrabold">Lances</span>
          <Separator />
          
          {liveData?.bidsHistory.map((bid, i) => (
            <div key={bid.id} className="flex flex-col gap-5">
              <BidCard 
                bid={bid}
                position={i+1}
              />
              <Separator />
            </div>
          ))}
        </div>
      ) : (
        <span>Ainda não há Lances para esse Lote...</span>
      )}      
      
    </div>
  )
}