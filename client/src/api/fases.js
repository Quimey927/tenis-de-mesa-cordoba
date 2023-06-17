import { json, redirect } from 'react-router-dom';

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

export const crearFase = async (datosFase, idFecha, idCategoriaFecha) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosFase),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos crear la fase.' }, { status: 500 });
  }

  return redirect(
    `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}`
  );
};

export const obtenerFase = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar la fase.' }, { status: 500 });
  }
  return response.json();
};

export const editarFase = async (
  idFase,
  datosFase,
  idFecha,
  idCategoriaFecha
) => {
  const response = await fetch(`${baseUrl}/${idFase}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosFase),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos editar la fase.' }, { status: 500 });
  }

  return redirect(
    `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}`
  );
};

export const borrarFase = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos eliminar la fase.' }, { status: 500 });
  }
};
