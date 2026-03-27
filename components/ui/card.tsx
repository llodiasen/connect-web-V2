import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

/* ── Card root variants ──────────────────────────────────────── */
const cardVariants = cva(
  [
    'rounded-lg',
    'transition-all duration-[300ms] ease-out',
  ],
  {
    variants: {
      variant: {
        /* Fond légèrement élevé, sans bordure */
        default: [
          'bg-[var(--bg-elevated)]',
        ],
        /* Fond élevé + ombre + glow orange subtil au hover */
        elevated: [
          'bg-[var(--bg-elevated)]',
          'shadow-[var(--shadow-md)]',
          'hover:shadow-[var(--shadow-glow-sm)] hover:-translate-y-0.5',
        ],
        /* Bordure visible, fond semi-transparent */
        bordered: [
          'bg-[var(--bg-elevated)]',
          'border border-[var(--border-subtle)]',
          'hover:border-[var(--border-default)]',
        ],
      },
      padding: {
        sm: 'p-5',     /* 20px — petit */
        md: 'p-8',     /* 32px = --card-padding — standard */
        lg: 'p-10',    /* 40px — spacieux */
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
)

/* ── Types ───────────────────────────────────────────────────── */
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/* ── Card root ───────────────────────────────────────────────── */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  )
)
Card.displayName = 'Card'

/* ── Card sub-components ─────────────────────────────────────── */
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-2 pb-5', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'font-heading font-semibold text-[var(--text-primary)] leading-snug',
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-[var(--text-secondary)] leading-relaxed', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
)
CardBody.displayName = 'CardBody'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter, cardVariants }
