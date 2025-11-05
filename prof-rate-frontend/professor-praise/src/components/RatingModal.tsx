import { useState } from "react";
import { Star } from "lucide-react";
import { Profesor } from "@/types/profesor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profesor: Profesor;
  onSubmit: (puntuacion: number, comentario: string) => void;
}

const RatingModal = ({ isOpen, onClose, profesor, onSubmit }: RatingModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comentario, setComentario] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Por favor selecciona una calificación",
        variant: "destructive",
      });
      return;
    }

    if (!comentario.trim()) {
      toast({
        title: "Error",
        description: "Por favor escribe un comentario",
        variant: "destructive",
      });
      return;
    }

    onSubmit(rating, comentario);
    
    toast({
      title: "¡Calificación enviada!",
      description: "Tu opinión ha sido registrada exitosamente",
    });

    // Reset form
    setRating(0);
    setComentario("");
  };

  const handleClose = () => {
    setRating(0);
    setComentario("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Calificar a {profesor.nombre}</DialogTitle>
          <DialogDescription>
            {profesor.materia} - {profesor.facultad}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Star Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Calificación</label>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-smooth hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-rating-gold text-rating-gold"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm font-medium text-foreground">
                  {rating} / 5
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label htmlFor="comentario" className="text-sm font-medium text-foreground">
              Comentario
            </label>
            <Textarea
              id="comentario"
              placeholder="Comparte tu experiencia con este profesor..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="min-h-[120px] transition-smooth"
            />
            <p className="text-xs text-muted-foreground">
              {comentario.length} / 500 caracteres
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 transition-smooth"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-primary hover:opacity-90 transition-smooth"
          >
            Enviar calificación
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;
