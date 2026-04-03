import { cn } from '../../utils/cn'

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'info'
  children: React.ReactNode
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-slate-100 text-slate-800': variant === 'default',
          'bg-green-100 text-green-800': variant === 'success',
          'bg-amber-100 text-amber-800': variant === 'warning',
          'bg-blue-100 text-blue-800': variant === 'info',
        }
      )}
    >
      {children}
    </span>
  )
}
