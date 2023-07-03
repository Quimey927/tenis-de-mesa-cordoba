import { json, redirect } from 'react-router-dom';

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

export const crearEliminatoria = async (datosEliminatoria) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosEliminatoria),
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos crear la eliminatoria.' },
      { status: 500 }
    );
  }

  return response.json();
};

export const editarEliminatoria = async (
  idEliminatoria,
  datosEliminatoria,
  idCategoriaFecha,
  idFecha,
  idFase
) => {
  const response = await fetch(`${baseUrl}/${idEliminatoria}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosEliminatoria),
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos editar la eliminatoria.' },
      { status: 500 }
    );
  }

  return redirect(
    `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}/eliminatoria/${idEliminatoria}`
  );
};

export const obtenerEliminatoria = async (idEliminatoria) => {
  const response = await fetch(`${baseUrl}/${idEliminatoria}`);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar la eliminatoria.' },
      { status: 500 }
    );
  }
  return response.json();
};
