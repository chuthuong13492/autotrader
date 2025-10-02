import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonParagraphProps {
  lines?: number
  className?: string
  minWidth?: string | number
  maxWidth?: string | number
  lineSpacing?: number
  hasEffect?: boolean
}

export const SkeletonParagraph: React.FC<SkeletonParagraphProps> = ({
  lines = 3,
  className,
  minWidth,
  maxWidth,
  lineSpacing = 8,
  hasEffect = true,
}) => {
  const skeletons: React.ReactNode[] = []

  for (let i = 1; i <= lines; i++) {
    const isLast = i === lines

    skeletons.push(
      <Skeleton
        key={`skeleton-${i}`}
        className={`
          h-4 rounded-md
          ${!isLast ? "w-full" : "w-2/3"} 
          ${className ?? ""}
        `}
        style={{
          minWidth,
          maxWidth,
        }}
        data-has-effect={hasEffect}
      />
    )

    if (!isLast) {
      skeletons.push(<div key={`spacer-${i}`} style={{ height: lineSpacing }} />)
    }
  }

  return <div className="flex flex-col items-start">{skeletons}</div>
}