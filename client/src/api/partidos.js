import { json } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/partidos';

export const obtenerPartidosDelGrupo = async (id, guardarEnEstado) => {
  const response = await fetch(`${baseUrl}/grupo/${id}`);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar los partidos del grupo.' },
      { status: 500 }
    );
  }
  const partidosDelGrupo = await response.json();
  guardarEnEstado(partidosDelGrupo);
};
