import { Profesor, Comentario } from "@/types/profesor";

export const mockProfesores: Profesor[] = [
  {
    id: 1,
    nombre: "Dr. Carlos Méndez",
    materia: "Cálculo Diferencial",
    facultad: "Ingeniería",
    promedio: 4.8,
    totalCalificaciones: 156,
    comentarios: [
      {
        id: 1,
        puntuacion: 5,
        comentario: "Excelente profesor, explica muy bien los conceptos y es muy paciente.",
        alias: "Usuario123",
        fecha: "2024-01-15"
      },
      {
        id: 2,
        puntuacion: 5,
        comentario: "Las clases son muy dinámicas y siempre está dispuesto a ayudar.",
        alias: "Estudiante456",
        fecha: "2024-01-20"
      },
      {
        id: 3,
        puntuacion: 4,
        comentario: "Buen profesor, aunque a veces va un poco rápido.",
        alias: "Anonimo789",
        fecha: "2024-02-01"
      }
    ]
  },
  {
    id: 2,
    nombre: "Dra. María González",
    materia: "Física Cuántica",
    facultad: "Ciencias",
    promedio: 4.6,
    totalCalificaciones: 98,
    comentarios: [
      {
        id: 4,
        puntuacion: 5,
        comentario: "Increíble profesora, hace que la física cuántica sea comprensible.",
        alias: "FisicaFan",
        fecha: "2024-01-18"
      },
      {
        id: 5,
        puntuacion: 4,
        comentario: "Muy buena, pero los exámenes son difíciles.",
        alias: "Usuario999",
        fecha: "2024-02-05"
      }
    ]
  },
  {
    id: 3,
    nombre: "Lic. Roberto Sánchez",
    materia: "Programación Web",
    facultad: "Informática",
    promedio: 4.9,
    totalCalificaciones: 203,
    comentarios: [
      {
        id: 6,
        puntuacion: 5,
        comentario: "El mejor profesor de programación. Muy actualizado y práctico.",
        alias: "DevMaster",
        fecha: "2024-01-10"
      },
      {
        id: 7,
        puntuacion: 5,
        comentario: "Aprendí muchísimo. Sus proyectos son muy útiles para el mundo real.",
        alias: "CodeNinja",
        fecha: "2024-01-25"
      },
      {
        id: 8,
        puntuacion: 5,
        comentario: "Explica todo paso a paso, perfecto para principiantes.",
        alias: "Newbie123",
        fecha: "2024-02-10"
      }
    ]
  },
  {
    id: 4,
    nombre: "Dra. Ana López",
    materia: "Química Orgánica",
    facultad: "Ciencias",
    promedio: 3.2,
    totalCalificaciones: 67,
  },
  {
    id: 5,
    nombre: "Ing. Pedro Ramírez",
    materia: "Estructuras de Datos",
    facultad: "Informática",
    promedio: 4.5,
    totalCalificaciones: 142,
  },
  {
    id: 6,
    nombre: "Lic. Laura Martínez",
    materia: "Marketing Digital",
    facultad: "Administración",
    promedio: 4.7,
    totalCalificaciones: 89,
  },
  {
    id: 7,
    nombre: "Dr. Jorge Torres",
    materia: "Anatomía Humana",
    facultad: "Medicina",
    promedio: 3.8,
    totalCalificaciones: 124,
  },
  {
    id: 8,
    nombre: "Dra. Carmen Ruiz",
    materia: "Derecho Penal",
    facultad: "Derecho",
    promedio: 4.4,
    totalCalificaciones: 76,
  },
  {
    id: 9,
    nombre: "Ing. Miguel Flores",
    materia: "Mecánica de Fluidos",
    facultad: "Ingeniería",
    promedio: 2.9,
    totalCalificaciones: 54,
  },
  {
    id: 10,
    nombre: "Lic. Patricia Vega",
    materia: "Psicología Social",
    facultad: "Psicología",
    promedio: 4.6,
    totalCalificaciones: 112,
  },
  {
    id: 11,
    nombre: "Dr. Fernando Castro",
    materia: "Álgebra Lineal",
    facultad: "Matemáticas",
    promedio: 4.2,
    totalCalificaciones: 95,
  },
  {
    id: 12,
    nombre: "Dra. Sofía Morales",
    materia: "Biología Molecular",
    facultad: "Ciencias",
    promedio: 4.8,
    totalCalificaciones: 134,
  },
];
