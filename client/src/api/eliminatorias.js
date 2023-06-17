import { json } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/eliminatorias';

export const obtenerEliminatorias = async (idFase) => {
  const response = await fetch(`${baseUrl}/fase/${idFase}`);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar las eliminatorias.' },
      { status: 500 }
    );
  }
  return response.json();
};

export const borrarEliminatoria = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos eliminar la eliminatoria.' },
      { status: 500 }
    );
  }
};
