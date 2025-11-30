import { LucideIcon, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: string;
  delay?: number;
}

const ServiceCard = ({ icon: Icon, title, description, link, delay = 0 }: ServiceCardProps) => {
  return (
    <Card 
      className="group hover-lift border-border bg-card hover:border-primary/30 transition-all duration-300 h-full flex flex-col animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <CardContent className="p-6 flex-grow">
        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="text-primary" size={28} />
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
      {link && (
        <CardFooter className="p-6 pt-0">
          <Link to={link} className="w-full">
            <Button variant="ghost" className="w-full justify-between group-hover:text-primary px-0 hover:bg-transparent">
              Learn More <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default ServiceCard;
