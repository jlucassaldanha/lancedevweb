"use client"

import Link from 'next/link'
import { LogoLanceDev } from './LogoLanceDev'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border/40 py-8 px-4 md:px-10 mt-auto flex flex-col md:flex-row justify-between gap-2">
      <div className="max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex flex-col gap-1">
          <div className="text-xs md:text-sm text-muted-foreground flex gap-2">
            © {currentYear} <LogoLanceDev /> <span>•</span> Todos os direitos reservados.
          </div>
          <div className="text-xs text-muted-foreground">
            Feito por <Link href="https://github.com/jlucassaldanha" className='text-cyan'>João Lucas</Link>.
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center md:items-end gap-2 max-w-md">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Este produto utiliza a API do <Link href="https://metmuseum.github.io/" target="_blank" className="text-secondary">The Metropolitan Museum of Art</Link>, mas não é endossado ou certificado pelo mesmo.
        </p>
      </div>
    </footer>
  )
}