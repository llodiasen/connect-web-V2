import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Fusionne des classes Tailwind en évitant les conflits (twMerge) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
