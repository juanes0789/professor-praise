import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, MessageSquare, ArrowLeft } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query"; 
import Navbar from "@/components/Navbar";
import RatingModal from "@/components/RatingModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Profesor } from "@/types/profesor";
import { Skeleton } from "@/components/ui/skeleton";

// Definición de la estructura de la respuesta de la API para /api/professors/:id
interface ProfesorDetailApiResponse {
    professor: {
        id: number;
        // Propiedades de la DB
        name: string; 
        subject: string; 
        faculty: string; 
        university: string;
        // Métricas que deben venir del backend (ya corregido en profesores.js)
        avg_score: number;
        total_calificaciones: number;
        photo?: string; 
    };
    // 🛑 CORRECCIÓN: Usamos las columnas REALES de la tabla 'comments' 🛑
    comments: {
        id: number;
        professor_id: number;
        comment: string; // Columna real de la DB
        created_at: string; // Columna real de la DB
    }[];
}

// Función para obtener los datos del profesor por ID
const fetchProfesorById = async (id: number): Promise<Profesor> => {
    const res = await fetch(`/api/professors/${id}`); 
    if (!res.ok) {
        throw new Error("Profesor no encontrado o error en el servidor.");
    }
    const data: ProfesorDetailApiResponse = await res.json();
    
    // Desestructurar el objeto professor (usando nombres de la DB)
    const { 
        id: dbId, 
        name, 
        subject, 
        faculty, 
        university,
        avg_score, 
        total_calificaciones, 
        photo
    } = data.professor;

    // Prevenir NaN si los campos numéricos son nulos
    const avgScore = avg_score || 0;
    const totalCalificaciones = total_calificaciones || 0;
    
    return {
        id: Number(dbId),
        
        // Mapeo de nombres de columna de la DB (name, subject, faculty)
        // a las propiedades del tipo Profesor (nombre, materia, facultad)
        nombre: name,
        materia: subject,
        facultad: faculty,
        foto: photo,

        // Mapeo de métricas
        promedio: Number(avgScore),
        totalCalificaciones: Number(totalCalificaciones), 
        
        // 🛑 CORRECCIÓN CRÍTICA: Mapeo de comentarios 🛑
        comentarios: data.comments.map(c => ({
            // Mapeamos las propiedades de la DB (c.comment, c.created_at)
            id: Number(c.id),
            
            // La puntuación está en la tabla 'ratings', no en 'comments'. 
            // Usamos un valor fijo (0) para evitar que falle el mapeo.
            puntuacion: 0, 
            
            // Mapeamos el nombre real de la columna de la DB
            comentario: c.comment, 
            
            // La columna 'alias' no existe, usamos un valor fijo para evitar fallos
            alias: "Usuario Anónimo", 
            
            // Mapeamos el nombre real de la columna de la DB
            fecha: new Date(c.created_at).toISOString().split("T")[0], 
        })),
    };
};

const ProfesorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const profesorId = Number(id);
  const queryClient = useQueryClient();

  // useQuery
  const { 
    data: profesor, 
    isLoading, 
    isError, 
    error
  } = useQuery<Profesor, Error>({
    queryKey: ["profesor", profesorId], 
    queryFn: () => fetchProfesorById(profesorId),
    enabled: !!profesorId,
    // 🛑 Sugerencia: Puedes omitir 'initialData' o asegurarte de que sea null
  });

  // useEffect para manejar la redirección por error (404)
  useEffect(() => {
    if (isError && error && error.message.includes("Profesor no encontrado")) {
        navigate("/profesores");
    }
  }, [isError, error, navigate]); 

  useEffect(() => {
    const storedAlias = localStorage.getItem("userAlias");
    if (!storedAlias) {
      navigate("/login");
    }
  }, [navigate]);
    
  const handleRatingSubmit = (puntuacion: number, comentario: string) => {
    if (!profesor) return;
    
    // TODO: Aquí se realiza la llamada POST al backend para guardar la calificación 
    
    queryClient.invalidateQueries({ queryKey: ["profesor", profesorId] });
    queryClient.invalidateQueries({ queryKey: ["profesores"] }); 
    
    console.log({ puntuacion, comentario }); 

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

  // Manejo de estado de carga
  if (isLoading || !profesor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-6 w-48 mb-6" />
            <div className="bg-card rounded-lg shadow-card p-8 mb-8">
                <div className="flex items-start gap-6">
                    <Skeleton className="w-24 h-24 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-5 w-1/2" />
                        <Skeleton className="h-5 w-1/3" />
                        <div className="flex items-center gap-4 mt-4">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-32" />
                        </div>
                        <Skeleton className="h-10 w-48" />
                    </div>
                </div>
            </div>
            <Skeleton className="h-6 w-64 mb-6" />
            <Skeleton className="h-40 w-full mb-4" />
            <Skeleton className="h-40 w-full" />
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
              {profesor.nombre?.charAt(0) ?? 'P'}            
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
              {profesor.comentarios.map((comentario, index) => (
                <Card key={comentario.id || index}>
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