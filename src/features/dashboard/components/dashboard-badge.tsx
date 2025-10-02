

interface DashboardBadgeProps {
  className?: string
}

export function DashboardBadge({ className }: DashboardBadgeProps) {
  return (
    <div className={`z-50 h-16 bg-blue-100 flex items-center justify-center ${className}`}>
      <a className='font-bold text-md' style={{ color: "#012169" }}>Tariffs: What You Need to Know</a>
    </div>
  )
}