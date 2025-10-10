

interface DashboardBadgeProps {
  className?: string
}

export function DashboardBadge({ className }: DashboardBadgeProps) {
  return (
    <div className={`z-50 h-16 bg-blue-100 flex items-center justify-center ${className}`}>
      <span className="font-bold text-md">
        Online car buying built around you.{" "}
        <a className='hover:underline' style={{ color: "#012169" }}>
          Shop Now
        </a>
      </span>

    </div>
  )
}