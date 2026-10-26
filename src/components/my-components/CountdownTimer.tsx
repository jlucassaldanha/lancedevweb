import { useEffect, useRef } from "react";

export function CountdownTimer({ endTime }: { endTime: string }) {
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateDOM = () => {
      const difference = new Date(endTime).getTime() - new Date().getTime();

      if (difference <= 0) {
        if (timeRef.current) timeRef.current.innerText = "Encerrado";
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      // Formatação condicional para exibir dias apenas se houver
      let formattedTime = "";
      if (days > 0) formattedTime += `${days} dia(s), `;
      
      formattedTime += `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      if (timeRef.current) {
        timeRef.current.innerText = formattedTime;
      }
    };

    updateDOM(); 

    const timer = setInterval(updateDOM, 1000);

    return () => clearInterval(timer);
    
  }, [endTime]); 

  return (
    <div>
      <div className="flex flex-col gap-2 font-bold">
        <span>Contagem regressiva para o encerramento do Lote</span>
        <span 
          ref={timeRef} 
          className="font-serif text-2xl font-bold text-secondary"
        >
          --:--:--
        </span>
      </div>
    </div>
  );
}