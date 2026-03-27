// components/ui/nav-link.tsx
// CLAUDE.md v3.1 — Active state border-bottom orange via usePathname

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

interface NavLinkProps {
  href:       string
  children:   React.ReactNode
  className?: string
  /** Si true, active seulement sur match exact (ex: '/') */
  exact?:     boolean
}

export function NavLink({ href, children, className, exact = false }: NavLinkProps) {
  const pathname = usePathname()

  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      className={cn(
        'nav-link',
        isActive && 'active',
        className,
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}
