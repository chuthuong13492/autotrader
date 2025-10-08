import React, { useEffect, useState } from "react";
import { cache } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Cache async function để load ảnh
const loadImage = cache(async (src: string) => {
  const img = new Image();
  img.src = src;
  await img.decode(); // đảm bảo ảnh đã load
  return src;
});

export interface BaseImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  alt?: string;
  src: string;
}

export const BaseImage = ({ className, alt = "Image", src, ...props }: BaseImageProps) => {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoadedSrc(null);
    setError(false);
    loadImage(src)
      .then(setLoadedSrc)
      .catch(() => setError(true));
  }, [src]);

  if (error) {
    return (
      <div
        className={cn(
          "w-full h-full rounded-xl bg-muted/40 text-muted-foreground",
          "flex items-center justify-center text-center",
          className
        )}

      >
        <div className="font-bold text-xl text-muted-foreground whitespace-pre-line leading-tight">
          {"AUTO\nTRADER"}
        </div>
      </div>
    );
  }

  if (!loadedSrc) {
    return <Skeleton className={cn("w-full h-full rounded-xl bg-muted/40", className)}/>;
  }

  return (
    <img
      src={loadedSrc}
      alt={alt}
      className={cn("w-full h-full object-cover rounded-xl", className)}
      {...props}
    />
  );
};