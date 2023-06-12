import { json } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/fases';

export const obtenerFases = async (idCategoriaFecha) => {
  const response = await fetch(`${baseUrl}/categoria/${idCategoriaFecha}`);
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar las fases de la categoría.',
      status: 500,
    });
  }
  return response.json();
};

export const borrarFase = (id) => {};
