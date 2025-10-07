import { forwardRef } from 'react'
import { Img, type ImgProps } from 'react-image'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export interface BaseImageProps
  extends Omit<ImgProps, 'loader' | 'unloader' | 'className' | 'alt'> {
  className?: string
  alt?: string
}

export const BaseImage = forwardRef<HTMLImageElement, BaseImageProps>(
  ({ className, alt, ...imgProps }, ref) => {
    return (
      <Img
        ref={ref}
        alt={alt}
        className={cn('w-full object-cover', className)}
        loader={
          <Skeleton className={
            cn(
              "w-full",
              className
            )
          } />
        }
        unloader={
          <div
            className={cn(
              "w-full h-full rounded-xl bg-muted/40 text-muted-foreground",
              "flex items-center justify-center text-center"
            )}
          >
            <div className="font-bold text-xl text-muted-foreground whitespace-pre-line leading-tight">
              {"AUTO\nTRADER"}
            </div>
          </div>
        }
        {...imgProps}
      />
    )
  }
)



