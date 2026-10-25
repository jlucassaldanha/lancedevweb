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

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
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
    <span 
      ref={timeRef} 
      className="font-serif text-2xl font-bold text-secondary"
    >
      --:--:--
    </span>
  );
}