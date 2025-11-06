//profesor.ts
export interface Comentario {
  id: number;
  puntuacion: number;
  comentario: string;
  alias: string;
  fecha: string;
}

export interface Profesor {
  id: number;
  nombre: string;
  materia: string;
  facultad: string;
  promedio: number;
  totalCalificaciones: number;
  foto?: string;
  comentarios?: Comentario[];
}
