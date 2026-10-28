import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function ArrowRightLink({ href, text }: { href: string, text: string }) {
  return (
    <div className='w-full flex justify-end'>
      <Link href={href} className="flex gap-2 mb-5 text-accent">
        {text}
        <ArrowRightIcon />
      </Link>
    </div>
  )
}