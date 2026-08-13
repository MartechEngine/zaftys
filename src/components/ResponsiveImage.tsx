import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const aspectClasses = {
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/10": "aspect-[16/10]",
  "2/1": "aspect-[2/1]",
  "16/9": "aspect-video",
  square: "aspect-square",
} as const;

export type ImageAspectRatio = keyof typeof aspectClasses;

type ResponsiveImageProps = {
  src: string;
  alt: string;
  aspectRatio?: ImageAspectRatio;
  /** Fill the parent container (for hero backgrounds). Parent must be positioned. */
  fill?: boolean;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
};

function webpCandidate(src: string): string | null {
  if (/\.webp($|\?)/i.test(src)) return null;
  if (/\.(jpe?g|png)($|\?)/i.test(src)) {
    return src.replace(/\.(jpe?g|png)($|\?)/i, ".webp$2");
  }
  return null;
}

const ResponsiveImage = ({
  src,
  alt,
  aspectRatio = "3/2",
  fill = false,
  className,
  imgClassName,
  priority = false,
  objectFit = "contain",
}: ResponsiveImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const webpSrc = webpCandidate(src);

  const fitClass = objectFit === "cover" ? "object-cover" : "object-contain";
  const imgClass = cn(
    "transition-opacity duration-300",
    fill ? cn("absolute inset-0 h-full w-full", fitClass) : cn("h-full w-full", fitClass),
    loaded ? "opacity-100" : "opacity-0",
    imgClassName,
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted/20",
        fill ? "absolute inset-0 h-full w-full" : cn("w-full", aspectClasses[aspectRatio]),
        !fill && objectFit === "contain" && "flex items-center justify-center",
        className,
      )}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted/60 via-muted/30 to-muted/60" />
      )}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted/50 text-muted-foreground">
          <ImageIcon size={28} className="opacity-40" />
          <span className="text-xs font-medium uppercase tracking-wider opacity-60">Image unavailable</span>
        </div>
      ) : (
        <picture>
          {webpSrc ? <source srcSet={webpSrc} type="image/webp" /> : null}
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            {...(priority ? { fetchPriority: "high" as const } : {})}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={imgClass}
          />
        </picture>
      )}
    </div>
  );
};

export default ResponsiveImage;
