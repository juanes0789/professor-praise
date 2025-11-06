import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Importar
import Navbar from "@/components/Navbar";
import RankingBar from "@/components/RankingBar";
import ProfesorCard from "@/components/ProfesorCard";
import RatingModal from "@/components/RatingModal";
// import { mockProfesores } from "@/data/mockData"; // Ya no necesitamos esto
import { Profesor } from "@/types/profesor";
import { Skeleton } from "@/components/ui/skeleton"; // Para el estado de carga

// Tipo para la respuesta de la API (antes de mapear)
interface ApiProfesor {
  id: number;
  name: string;
  subject: string;
  faculty: string;
  avg_score: number;
  total_calificaciones: number;
  foto?: string;
}

// Función para cargar los profesores desde la API
const fetchProfesores = async (): Promise<Profesor[]> => {
  const res = await fetch("/api/professors"); 
  if (!res.ok) {
    throw new Error("Error al cargar los profesores");
  }
  const data: ApiProfesor[] = await res.json();

  // Mapeamos los nombres de la API a los nombres de nuestro tipo Frontend
  return data.map((prof) => ({
    ...prof, // <--- ¡ESTA LÍNEA ES LA MÁS IMPORTANTE!
    promedio: prof.avg_score,
    totalCalificaciones: prof.total_calificaciones,
  }));
};

const Profesores = () => {
  const navigate = useNavigate();
  // const [profesores, setProfesores] = useState<Profesor[]>(mockProfesores); // Reemplazado por React Query
  const [selectedProfesor, setSelectedProfesor] = useState<Profesor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  const queryClient = useQueryClient(); // Para invalidar la caché después

  useEffect(() => {
    const storedAlias = localStorage.getItem("userAlias");
    if (!storedAlias) {
      navigate("/login");
    }
  }, [navigate]);

  // Usar useQuery para cargar los datos
  const { data: profesores = [], isLoading, isError } = useQuery<Profesor[]>({
    queryKey: ["profesores"], // Clave para la caché
    queryFn: fetchProfesores, // Función que carga los datos
  });

  const handleRateClick = (profesor: Profesor) => {
    setSelectedProfesor(profesor);
    setIsModalOpen(true);
  };

  const handleRatingSubmit = (puntuacion: number, comentario: string) => {
    if (!selectedProfesor) return;

    // ---
    // TODO: Aquí es donde harías la mutación (POST) al backend
    // Por ahora, solo actualizamos localmente y refrescamos.
    // ---
    
    // En lugar de setProfesores, invalidamos la caché de react-query
    // para que vuelva a cargar los datos actualizados del servidor.
    queryClient.invalidateQueries({ queryKey: ["profesores"] });
    
    console.log({ puntuacion, comentario }); // Lógica temporal

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