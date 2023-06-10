import { json, redirect } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/categoriasFechas';

export const obtenerCategoriasFecha = async (idFecha) => {
  const response = await fetch(`${baseUrl}/fecha/${idFecha}`);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar las categorías de la fecha.' },
      { status: 500 }
    );
  }
  return response.json();
};

export const crearCategoriaFecha = async (idFecha, datosCategoriaFecha) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosCategoriaFecha),
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos crear la categoría de la fecha.' },
      { status: 500 }
    );
  }

  return redirect(`/admin/fechas/${idFecha}/editar`);
};

export const obtenerCategoriaFecha = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar la categoría de la fecha.' },
      { status: 500 }
    );
  }
  return response.json();
};

export const editarCategoriaFecha = async (
  idCategoriaFecha,
  idFecha,
  datosCategoriaFecha
) => {
  const response = await fetch(`${baseUrl}/${idCategoriaFecha}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosCategoriaFecha),
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos editar la categoría de la fecha.' },
      { status: 500 }
    );
  }

  return redirect(`/admin/fechas/${idFecha}/editar`);
};

export const borrarCategoriaFecha = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos eliminar la categoría de la fecha.' },
      { status: 500 }
    );
  }
};
