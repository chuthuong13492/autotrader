

interface DashboardBadgeProps {
  children: React.ReactNode
  className?: string
}

export function DashboardBadge({ children, className = '' }: DashboardBadgeProps) {
  return (
    <div className={`z-50 h-16 bg-blue-100 flex items-center justify-center ${className}`}>
       {children}
    </div>
  )
}