import { MetObj } from '@/types/met';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

interface MetArtCardProps {
  art: MetObj;
  onSelectArt?: (art: MetObj) => void;
  isSearch?: boolean
}

export function MetArtCard({ art, onSelectArt, isSearch }: MetArtCardProps) {
  return (
    <div className="w-full flex flex-col justify-between h-full gap-4 p-4">
      <div className='flex flex-col gap-3'>
        <div className="w-full aspect-square relative bg-muted/30 overflow-hidden flex items-center justify-center">
          <Image 
            src={art.primaryImageSmall || "/placeholder.png"}
            alt={art.title}
            fill
            className="object-contain p-2"
          />
        </div>
        
        <h3 className="text-2xl font-serif line-clamp-2 min-h-14 flex items-center text-secondary">{art.title}</h3>
        <Separator />
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between h-full gap-2">
          
          <div className="flex gap-10 items-center">
            <div className="flex flex-col gap-2"> 
              <span>Artista</span>
              <span className="font-serif">{art.artistDisplayName}</span>
            </div>

            <div className="flex flex-col gap-2"> 
              <span>Data</span>
              <span className="font-serif">{art.objectDate || "Desconhecido"}</span>
            </div>
          </div>
        </div>

        {isSearch && onSelectArt && (
          <div className="flex gap-2 mt-5">
            <Button onClick={() => onSelectArt(art)}>
              Escolher Arte
            </Button>
          </div>
        )}
        
      </div>
    </div>
  )
}