import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <div 
      className="text-center animate-fade-in-up p-6 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300"
      style={{ animationDelay: `${delay}s` }}
    >
      <div 
        className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-float backdrop-blur-sm border border-primary/30 text-accent"
        style={{ animationDelay: `${delay * 0.5}s` }}
      >
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
