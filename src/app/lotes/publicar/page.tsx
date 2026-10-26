import { Separator } from '@/components/ui/separator';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function PublicarLotesPage() {
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

      <Separator className="my-5"/>


    </div>
  )
}