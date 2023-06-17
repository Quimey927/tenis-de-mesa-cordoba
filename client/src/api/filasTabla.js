import { json } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/filas-tabla';

export const obtenerFilasTabla = async (id, guardarEnEstado) => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar las filas de la tabla.' },
      { status: 500 }
    );
  }
  const filasTabla = await response.json();
  guardarEnEstado(filasTabla);
};
