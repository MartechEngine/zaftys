import { LucideIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: string;
  delay?: number;
}

/** Dense marketing tile with light depth. */
const ServiceCard = ({ icon: Icon, title, description, link }: ServiceCardProps) => {
  const inner = (
    <>
      <div className="mb-5 flex h-12 w-12 items-center justify-center border border-border bg-surface text-primary shadow-sm">
        <Icon size={24} />
      </div>
      <h3 className="mb-3 font-heading text-lg font-bold text-navy group-hover:text-primary">{title}</h3>
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      {link ? (
        <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
          Learn more <ArrowRight className="ml-1.5" size={16} />
        </span>
      ) : null}
    </>
  );

  const className =
    "group flex h-full flex-col border border-border bg-white p-6 shadow-sm transition-[box-shadow,border-color] duration-200 hover:border-primary/35 hover:shadow-md";

  if (link) {
    return (
      <Link to={link} className={className}>
        {inner}
      </Link>
    );
  }

  return <article className={className}>{inner}</article>;
};

export default ServiceCard;
