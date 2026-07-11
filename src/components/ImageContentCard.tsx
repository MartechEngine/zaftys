import { Card, CardContent } from "@/components/ui/card";
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
    <Card className={cn("border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white h-full flex flex-col", className)}>
      <ResponsiveImage
        src={imageSrc}
        alt={imageAlt}
        aspectRatio="3/2"
        objectFit="contain"
        className={darkImageBg ? "bg-black" : undefined}
      />
      <CardContent className="p-6 flex flex-col flex-grow">
        {tagline && (
          <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">{tagline}</p>
        )}
        <h3 className="text-xl font-heading font-bold text-navy mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{description}</p>
        {footer && <div className="mt-4 pt-4 border-t border-border/50">{footer}</div>}
      </CardContent>
    </Card>
  );
};

export default ImageContentCard;
