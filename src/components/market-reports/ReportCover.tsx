type ReportCoverProps = {
  src: string;
  alt: string;
  className?: string;
  /** Decorative listing thumb — empty alt when title is adjacent */
  decorative?: boolean;
};

/** Full report cover — width-fluid, intrinsic aspect, never cropped. */
export function ReportCover({ src, alt, className = "", decorative = false }: ReportCoverProps) {
  return (
    <div className={`relative w-full overflow-hidden bg-[#061a33] ${className}`}>
      <img
        src={src}
        alt={decorative ? "" : alt}
        className="block w-full h-auto"
        loading={decorative ? "lazy" : "eager"}
        decoding="async"
      />
    </div>
  );
}
