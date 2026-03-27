'use client'

// CLAUDE.md v4.1 — Système de boutons — Tous les styles en inline styles
// Primaire : #E8622A → #C9501E hover · Secondaire : #1B2B4B → #243659 hover
// Ghost     : transparent + border #1B2B4B → #1B2B4B bg hover · transition: all 0.2s ease

import * as React from 'react'

/* ── Types ───────────────────────────────────────────────────── */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize    = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?:    ButtonSize
  asChild?: boolean
}

/* ── Tailles ─────────────────────────────────────────────────── */
const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm: { height: '36px', padding: '0 16px', fontSize: '13px' },
  md: { height: '44px', padding: '0 20px', fontSize: '15px' },
  lg: { height: '52px', padding: '0 32px', fontSize: '15px' },
}

/* ── Styles par variante ─────────────────────────────────────── */
function getVariantStyle(variant: ButtonVariant, hovered: boolean): React.CSSProperties {
  switch (variant) {
    case 'primary':
      return {
        background: hovered ? '#C9501E' : '#E8622A',
        color:      '#FFFFFF',
        border:     'none',
        transform:  hovered ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow:  hovered ? '0 4px 12px rgba(232, 98, 42, 0.30)' : 'none',
      }
    case 'secondary':
      return {
        background: hovered ? '#243659' : '#1B2B4B',
        color:      '#FFFFFF',
        border:     'none',
        transform:  hovered ? 'translateY(-1px)' : 'translateY(0)',
      }
    case 'ghost':
      return {
        background: hovered ? '#1B2B4B' : 'transparent',
        color:      hovered ? '#FFFFFF' : '#1B2B4B',
        border:     '1.5px solid #1B2B4B',
      }
    case 'outline':
      return {
        background: hovered ? '#E8622A' : 'transparent',
        color:      hovered ? '#FFFFFF' : '#E8622A',
        border:     '1.5px solid #E8622A',
      }
  }
}

/* ── Composant ───────────────────────────────────────────────── */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', style, onMouseEnter, onMouseLeave, disabled, ...props }, ref) => {
    const [hovered, setHovered] = React.useState(false)

    const mergedStyle: React.CSSProperties = {
      display:        'inline-flex',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            '8px',
      fontFamily:     'var(--font-body)',
      fontWeight:     600,
      borderRadius:   '8px',
      cursor:         disabled ? 'not-allowed' : 'pointer',
      whiteSpace:     'nowrap',
      textDecoration: 'none',
      outline:        'none',
      transition:     'all 0.2s ease',
      opacity:        disabled ? 0.5 : 1,
      ...SIZE_STYLES[size],
      ...getVariantStyle(variant, hovered && !disabled),
      ...style,
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        style={mergedStyle}
        onMouseEnter={e => { setHovered(true); onMouseEnter?.(e) }}
        onMouseLeave={e => { setHovered(false); onMouseLeave?.(e) }}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

/* ── Export compat (remplace buttonVariants/CVA) ─────────────── */
export function buttonVariants({ variant = 'primary', size = 'md' }: { variant?: ButtonVariant; size?: ButtonSize } = {}) {
  return `btn btn-${variant} btn-${size}`
}

export { Button }
