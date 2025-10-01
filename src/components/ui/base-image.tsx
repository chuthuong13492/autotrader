import  { forwardRef } from 'react'
import { Img, type ImgProps } from 'react-image'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { ImageOff } from 'lucide-react'

export interface BaseImageProps
    extends Omit<ImgProps, 'loader' | 'unloader' | 'className' | 'alt'> {
    className?: string
    alt?: string
}

export const BaseImage = forwardRef<HTMLImageElement, BaseImageProps>(
    ({ className, alt, ...imgProps }, ref) => {
        return (
            <div className={className}>
                <Img
                    ref={ref}
                    alt={alt}
                    className={cn('h-full w-full object-cover')}
                    loader={
                        <Skeleton className={
                            cn(
                                "h-full w-full",
                                className
                            )
                        } />
                    }
                    unloader={
                        <div
                            className={cn(
                                'h-full w-full rounded bg-muted/40 text-muted-foreground',
                                'flex items-center justify-center text-sm',
                                className
                            )}
                        >
                            <ImageOff />
                        </div>
                    }
                    {...imgProps}
                />
            </div>
        )
    }
)



