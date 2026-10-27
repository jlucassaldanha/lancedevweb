export function BalanceComponent({ availableBalance }: { availableBalance?: string }) {
  return (
    <div className='flex flex-col font-bold'>
      <span>Saldo atual</span>
      <span className='font-serif text-primary text-2xl'>R$ {Number(availableBalance).toFixed(2)}</span>
    </div>
  )
}