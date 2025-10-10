import React, { useEffect, useState } from "react";

type CacheImageProps = {
    src: string;
    alt?: string;
    className?: string;
    placeholder: React.ReactNode;
    fallback: React.ReactNode;
};

const imageCache = new Map<string, string>();

export function CacheImage({
    src,
    alt,
    className,
    placeholder,
    fallback,
}: CacheImageProps) {
    const [status, setStatus] = useState<
        "idle" | "loading" | "loaded" | "error"
    >(imageCache.has(src) ? "loaded" : "idle");

    useEffect(() => {
        if (!src) return;

        if (imageCache.has(src)) {
            setStatus("loaded");
            return;
        }

        setStatus("loading");
        const img = new Image();

        img.onload = () => {
            imageCache.set(src, src);
            setStatus("loaded");
        };

        img.onerror = () => {
            setStatus("error");
        };

        img.src = src;

        // cleanup để tránh leak nếu unmount
        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src]);

    if (status === "error")
        return (
            fallback
        );

    if (status === "loading" || status === "idle")
        return (
            placeholder
        );

    // loaded
    return <img src={imageCache.get(src)} alt={alt} className={className} />;
}