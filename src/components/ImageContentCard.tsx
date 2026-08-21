import ResponsiveImage from "@/components/ResponsiveImage";
import { cn } from "@/lib/utils";

type ImageContentCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  tagline?: string;
  description: string;
  footer?: React.ReactNode;
  className?: string;
  /** Dark backdrop for branded truck renders on black backgrounds */
  darkImageBg?: boolean;
};

const ImageContentCard = ({
  imageSrc,
  imageAlt,
  title,
  tagline,
  description,
  footer,
  className,
  darkImageBg = false,
}: ImageContentCardProps) => {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden border border-border bg-white transition-colors hover:border-primary/40",
        className,
      )}
    >
      <ResponsiveImage
        src={imageSrc}
        alt={imageAlt}
        aspectRatio="3/2"
        objectFit="contain"
        className={darkImageBg ? "bg-black" : undefined}
      />
      <div className="flex flex-grow flex-col p-6">
        {tagline ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{tagline}</p>
        ) : null}
        <h3 className="mb-2 font-heading text-xl font-bold text-navy group-hover:text-primary">{title}</h3>
        <p className="flex-grow text-sm leading-relaxed text-muted-foreground">{description}</p>
        {footer ? <div className="mt-4 border-t border-border pt-4">{footer}</div> : null}
      </div>
    </article>
  );
};

export default ImageContentCard;
