import { Star, MessageSquare, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Profesor } from "@/types/profesor";
import { Button } from "@/components/ui/button";

interface ProfesorCardProps {
  profesor: Profesor;
  onRateClick: () => void;
}

const ProfesorCard = ({ profesor, onRateClick }: ProfesorCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-rating-gold text-rating-gold"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="bg-card rounded-lg shadow-card hover:shadow-hover transition-smooth p-6 space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
          {profesor.nombre.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground">{profesor.nombre}</h3>
          <p className="text-sm text-muted-foreground">{profesor.materia}</p>
          <p className="text-xs text-muted-foreground">{profesor.facultad}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">{renderStars(profesor.promedio)}</div>
          <span className="font-bold text-foreground">{profesor.promedio.toFixed(1)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessageSquare className="w-4 h-4" />
          <span>{profesor.totalCalificaciones} calificaciones</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Link to={`/profesores/${profesor.id}`} className="flex-1">
          <Button
            variant="outline"
            className="w-full"
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver detalles
          </Button>
        </Link>
        <Button
          onClick={onRateClick}
          className="flex-1 bg-gradient-primary hover:opacity-90 transition-smooth"
        >
          Calificar
        </Button>
      </div>
    </div>
  );
};

export default ProfesorCard;
