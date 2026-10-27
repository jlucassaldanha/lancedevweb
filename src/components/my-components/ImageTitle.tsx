import Image from 'next/image';
import { Separator } from '../ui/separator';

interface ImageTitleProps {
  imgUrl: string
  title: string
}

export function ImageTitle({ imgUrl, title }: ImageTitleProps) {
  return (
    <div className='flex flex-col gap-3'>
      <div className="w-full aspect-square relative bg-muted/30 overflow-hidden flex items-center justify-center">
        <Image 
          src={imgUrl || "/placeholder.png"}
          alt={title}
          fill
          className="object-contain p-2"
        />
      </div>
      
      <span className="text-2xl font-serif line-clamp-2 min-h-14 flex items-center">{title}</span>
      
      <Separator />
    </div>
  )
}