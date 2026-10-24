"use client"

import useListLots from "@/hooks/useListLots";
import Image from "next/image";

export default function Home() {
  const { lots, isPending, isError } = useListLots()

  return (
    <div>
      {lots.map((lot) => (
        <div key={lot.id}>
          {lot.title}
          <Image 
            src={lot.imageUrl}
            alt={lot.title}
            width={400}
            height={400}
          />
        </div>
      ))}
      
    </div>
  );
}
