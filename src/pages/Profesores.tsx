import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import RankingBar from "@/components/RankingBar";
import ProfesorCard from "@/components/ProfesorCard";
import RatingModal from "@/components/RatingModal";
import { Profesor } from "@/types/profesor";
import { Skeleton } from "@/components/ui/skeleton";

// Tipo para la respuesta de la API (COINCIDE CON LA DB)
interface ApiProfesor {
  id: number;
  name: string; // 🛑 CORREGIDO: Coincide con la columna 'name' de la DB
  subject: string; // 🛑 CORREGIDO: Coincide con la columna 'subject' de la DB
  faculty: string; // 🛑 CORREGIDO: Coincide con la columna 'faculty' de la DB
  university: string; // 🛑 NUEVO: Coincide con la columna 'university' de la DB
  avg_score: number;
  total_calificaciones: number;
  foto?: string; // Asumimos que 'foto' puede ser el nombre de la columna si existe
}

// Función para cargar los profesores desde la API y mapear nombres
const fetchProfesores = async (): Promise<Profesor[]> => {
  const res = await fetch("/api/professors"); 
  if (!res.ok) {
    throw new Error("Error al cargar los profesores");
  }
  const data: ApiProfesor[] = await res.json();
  
  return data.map((prof) => {
    // Desestructuramos usando los nombres de la DB
    const { 
        id, 
        name, 
        subject, 
        faculty, 
        university, // Incluimos university
        avg_score, 
        total_calificaciones, 
        foto 
    } = prof;

    return ({
        id: Number(id),
        
        // 🛑 Mapeo de DB (camelCase) a Frontend (español) 🛑
        nombre: name, // name -> nombre
        materia: subject, // subject -> materia
        facultad: faculty, // faculty -> facultad
        university: university, // university -> university (si lo usas en el tipo Profesor)
        foto: foto,
        
        // Mapeo de datos numéricos
        promedio: Number(avg_score) || 0,
        totalCalificaciones: Number(total_calificaciones) || 0, 
    });
  });
};

const Profesores = () => {
  // ... (el resto del componente no necesita cambios)
  
  const navigate = useNavigate();
  const [selectedProfesor, setSelectedProfesor] = useState<Profesor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedAlias = localStorage.getItem("userAlias");
    if (!storedAlias) {
      navigate("/login");
    }
  }, [navigate]);

  // Usar useQuery para cargar los datos
  const { data: profesores = [], isLoading, isError } = useQuery<Profesor[]>({
    queryKey: ["profesores"],
    queryFn: fetchProfesores,
  });

  const handleRateClick = (profesor: Profesor) => {
    setSelectedProfesor(profesor);
    setIsModalOpen(true);
  };

  const handleRatingSubmit = (puntuacion: number, comentario: string) => {
    if (!selectedProfesor) return;

    // TODO: Lógica de mutación POST al backend aquí
    
    queryClient.invalidateQueries({ queryKey: ["profesores"] });
    console.log({ puntuacion, comentario }); 

    setIsModalOpen(false);
  };

  // Ordenamos los datos de `profesores` que vienen de useQuery
  const sortedProfesores = [...profesores].sort((a, b) => {
    return sortOrder === "desc"
      ? b.promedio - a.promedio
      : a.promedio - b.promedio;
  });

  const topProfesores = [...profesores]
    .sort((a, b) => b.promedio - a.promedio)
    .slice(0, 3);

  const worstProfesores = [...profesores]
    .sort((a, b) => a.promedio - b.promedio)
    .slice(0, 3);

  // Manejar estado de carga
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {/* Esqueletos de carga */}
          <Skeleton className="h-64 w-full rounded-lg mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-48 w-full rounded-lg" />)}
          </div>
        </main>
      </div>
    );
  }

  // Manejar estado de error
  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        Error al cargar los datos. Intenta de nuevo más tarde.
      </div>
    );
  }

return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <RankingBar
          topProfesores={topProfesores}
          worstProfesores={worstProfesores}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {sortedProfesores.map((profesor) => (
            <ProfesorCard
              key={profesor.id}
              profesor={profesor}
              onRateClick={() => handleRateClick(profesor)}
            />
          ))}
        </div>
      </main>

      {selectedProfesor && (
        <RatingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          profesor={selectedProfesor}
          onSubmit={handleRatingSubmit}
          
        />
      )}
    </div>
  );
};

export default Profesores;