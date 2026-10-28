import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export function ArrowLeftLink({ href, text }: { href: string, text: string }) {
  return (
    <div className='w-full'>
      <Link href={href} className="flex gap-2 mb-5">
        <ArrowLeftIcon />
        {text}
      </Link>
    </div>
  )
}