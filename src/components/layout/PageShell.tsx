import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function PageShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('py-10 pb-20 sm:py-14 sm:pb-28', className)}>
      <div className="shell">{children}</div>
    </div>
  )
}

export function EmptyOrderState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="mx-auto max-w-xl rounded-[24px] border border-ink/10 bg-cream p-8 text-center sm:p-12">
      <p className="eyebrow text-royal">Demo belum dimulai</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em]">{title}</h2>
      <p className="mt-3 text-ink/65">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  )
}
