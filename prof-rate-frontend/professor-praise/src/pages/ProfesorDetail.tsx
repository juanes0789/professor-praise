import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, MessageSquare, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import RatingModal from "@/components/RatingModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProfesores } from "@/data/mockData";
import { Profesor } from "@/types/profesor";

const ProfesorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profesor, setProfesor] = useState<Profesor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedAlias = localStorage.getItem("userAlias");
    if (!storedAlias) {
      navigate("/login");
      return;
    }

    const foundProfesor = mockProfesores.find((p) => p.id === Number(id));
    if (foundProfesor) {
      setProfesor(foundProfesor);
    } else {
      navigate("/profesores");
    }
  }, [id, navigate]);

  const handleRatingSubmit = (puntuacion: number, comentario: string) => {
    if (!profesor) return;

    const alias = localStorage.getItem("userAlias") || "Anónimo";
    const newComentario = {
      id: (profesor.comentarios?.length || 0) + 1,
      puntuacion,
      comentario,
      alias,
      fecha: new Date().toISOString().split("T")[0],
    };

    const newTotal = profesor.promedio * profesor.totalCalificaciones + puntuacion;
    const newCount = profesor.totalCalificaciones + 1;

    setProfesor({
      ...profesor,
      promedio: newTotal / newCount,
      totalCalificaciones: newCount,
      comentarios: [newComentario, ...(profesor.comentarios || [])],
    });

    setIsModalOpen(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? "fill-rating-gold text-rating-gold"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  if (!profesor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Link to="/profesores" className="inline-flex items-center gap-2 text-accent hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Volver a profesores
        </Link>

        <div className="bg-card rounded-lg shadow-card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-4xl font-bold text-primary-foreground flex-shrink-0">
              {profesor.nombre.charAt(0)}
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="font-bold text-3xl text-foreground mb-2">{profesor.nombre}</h1>
                <p className="text-lg text-muted-foreground">{profesor.materia}</p>
                <p className="text-md text-muted-foreground">{profesor.facultad}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {renderStars(profesor.promedio)}
                  <span className="font-bold text-2xl text-foreground">
                    {profesor.promedio.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageSquare className="w-5 h-5" />
                  <span>{profesor.totalCalificaciones} calificaciones</span>
                </div>
              </div>

              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-primary hover:opacity-90 transition-smooth"
              >
                Calificar a este profesor
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            Comentarios ({profesor.comentarios?.length || 0})
          </h2>

          {profesor.comentarios && profesor.comentarios.length > 0 ? (
            <div className="grid gap-4">
              {profesor.comentarios.map((comentario) => (
                <Card key={comentario.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                          {comentario.alias.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{comentario.alias}</CardTitle>
                          <p className="text-sm text-muted-foreground">{comentario.fecha}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(comentario.puntuacion)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground">{comentario.comentario}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Aún no hay comentarios para este profesor. ¡Sé el primero en calificar!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {profesor && (
        <RatingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          profesor={profesor}
          onSubmit={handleRatingSubmit}
        />
      )}
    </div>
  );
};

export default ProfesorDetail;
