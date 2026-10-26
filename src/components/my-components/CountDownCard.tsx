import { CountdownTimer } from "./CountdownTimer";

export function CountDownCard({ endTime }: { endTime: string }) {
  return (
    <div>
      <div className="flex flex-col gap-2 font-bold">
        <span>Contagem regressiva para o encerramento do Lote</span>
        <CountdownTimer endTime={endTime}/>
      </div>
    </div>
  )
}