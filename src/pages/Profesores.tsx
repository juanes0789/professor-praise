import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import RankingBar from "@/components/RankingBar";
import ProfesorCard from "@/components/ProfesorCard";
import RatingModal from "@/components/RatingModal";
import { mockProfesores } from "@/data/mockData";
import { Profesor } from "@/types/profesor";

const Profesores = () => {
  const navigate = useNavigate();
  const [profesores, setProfesores] = useState<Profesor[]>(mockProfesores);
  const [selectedProfesor, setSelectedProfesor] = useState<Profesor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const storedAlias = localStorage.getItem("userAlias");
    if (!storedAlias) {
      navigate("/login");
    }
  }, [navigate]);

  const handleRateClick = (profesor: Profesor) => {
    setSelectedProfesor(profesor);
    setIsModalOpen(true);
  };

  const handleRatingSubmit = (puntuacion: number, comentario: string) => {
    if (!selectedProfesor) return;

    // Actualizar el promedio del profesor
    setProfesores((prev) =>
      prev.map((prof) => {
        if (prof.id === selectedProfesor.id) {
          const newTotal = prof.promedio * prof.totalCalificaciones + puntuacion;
          const newCount = prof.totalCalificaciones + 1;
          return {
            ...prof,
            promedio: newTotal / newCount,
            totalCalificaciones: newCount,
          };
        }
        return prof;
      })
    );

    setIsModalOpen(false);
  };

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
