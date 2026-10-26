import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function ErrorCard({ message, title }: { message: string, title: string }) {
  return ( 
    <Alert className='text-red-400 m-5'>
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className='text-red-400'>
        {message}
      </AlertDescription>
    </Alert> 
  )
}