export interface Profesor {
  id: number;
  nombre: string;
  materia: string;
  facultad: string;
  promedio: number;
  totalCalificaciones: number;
  foto?: string;
}
