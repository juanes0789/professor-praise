//RankingBar.tsx
import { Trophy, TrendingDown, ArrowUpDown } from "lucide-react";
import { Profesor } from "@/types/profesor";
import { Button } from "@/components/ui/button";

interface RankingBarProps {
  topProfesores: Profesor[];
  worstProfesores: Profesor[];
  sortOrder: "asc" | "desc";
  onSortChange: (order: "asc" | "desc") => void;
}

const RankingBar = ({ topProfesores, worstProfesores, sortOrder, onSortChange }: RankingBarProps) => {
  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Rankings</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSortChange(sortOrder === "desc" ? "asc" : "desc")}
          className="gap-2 transition-smooth"
        >
          <ArrowUpDown className="w-4 h-4" />
          {sortOrder === "desc" ? "Mejores primero" : "Peores primero"}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Profesores */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-rating-gold" />
            <h3 className="text-lg font-semibold text-foreground">Top Profesores</h3>
          </div>
          <div className="space-y-2">
            {topProfesores.map((profesor, index) => (
              <div
                key={profesor.id}
                className="flex items-center justify-between p-3 bg-secondary rounded-lg transition-smooth hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                  <div>
                    <p className="font-medium text-foreground">{profesor.nombre}</p>
                    <p className="text-sm text-muted-foreground">{profesor.materia}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-rating-gold">⭐</span>
                    <span className="font-bold text-foreground">{profesor.promedio.toFixed(1) ?? 'N/A'}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{profesor.totalCalificaciones} votos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Worst Profesores */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-destructive" />
            <h3 className="text-lg font-semibold text-foreground">Necesitan mejorar</h3>
          </div>
          <div className="space-y-2">
            {worstProfesores.map((profesor, index) => (
              <div
                key={profesor.id}
                className="flex items-center justify-between p-3 bg-secondary rounded-lg transition-smooth hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                  <div>
                    <p className="font-medium text-foreground">{profesor.nombre}</p>
                    <p className="text-sm text-muted-foreground">{profesor.materia}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-rating-gold">⭐</span>
                    <span className="font-bold text-foreground">{profesor.promedio.toFixed(1) ?? 'N/A'}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{profesor.totalCalificaciones} votos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingBar;
