import { json } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/colores-tabla';

export const obtenerColoresTabla = async (id, guardarEnEstado) => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar los colores de la tabla.' },
      { status: 500 }
    );
  }
  const coloresTabla = await response.json();
  guardarEnEstado(coloresTabla);
};
