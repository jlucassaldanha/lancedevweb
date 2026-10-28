"use client"

import { ArrowLeftLink } from "@/components/my-components/ArrowLeftLink";
import { useAuth } from "@/contexts/authContext";
import { FaceSlightlyFrowning } from "lucide-react";

export default function BadPage() {
  const auth = useAuth();
  const role = auth.user?.role.toLowerCase()

  return (
    <div className="flex flex-col px-10 mb-5 justify-center items-center">
      <ArrowLeftLink 
        href={`/dashboard/${role}`}
        text="Ir para o Dashboard"
      />
      <div className="flex flex-col gap-8 w-150 p-10">
        <FaceSlightlyFrowning className="text-secondary" size={80}/>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl text-secondary font-extrabold">Desculpe, você não tem acesso a essa página...</h2>
          <p>O seu acesso não te da permissão para acessar o conteúdo dessa página.</p>
          <p>Tente com uma conta com permissões diferentes.</p>
        </div>
        
      </div>
    </div>
  )
}