export interface Comentario {
  id: number;
  puntuacion: number;
  comentario: string;
  alias: string;
  fecha: string;
}

export interface Profesor {
  id: number;
  name: string;
  subject: string;
  faculty: string;
  promedio: number;
  totalCalificaciones: number;
  foto?: string;
  comentarios?: Comentario[];
}
