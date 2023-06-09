import { json, redirect } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/categoriasTorneos';

export const obtenerCategoriasTorneo = async (idTorneo) => {
  const response = await fetch(`${baseUrl}/torneo/${idTorneo}`);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar las categorías del torneo.' },
      { status: 500 }
    );
  }
  return response.json();
};

export const crearCategoriaTorneo = async (idTorneo, datosCategoriaTorneo) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosCategoriaTorneo),
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos crear la categoría del torneo.' },
      { status: 500 }
    );
  }

  return redirect(`/admin/torneos/${idTorneo}`);
};

export const obtenerCategoriaTorneo = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar la categoría del torneo.' },
      { status: 500 }
    );
  }
  return response.json();
};

export const editarCategoriaTorneo = async (
  idCategoriaTorneo,
  idTorneo,
  datosCategoriaTorneo
) => {
  const response = await fetch(`${baseUrl}/${idCategoriaTorneo}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosCategoriaTorneo),
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos editar la categoría del torneo.' },
      { status: 500 }
    );
  }

  return redirect(`/admin/torneos/${idTorneo}/categorias/${idCategoriaTorneo}`);
};

export const borrarCategoriaTorneo = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos eliminar la categoría del torneo.' },
      { status: 500 }
    );
  }
};

export const obtenerCategoriasTorneoPosibles = async (idFecha) => {
  const response = await fetch(`${baseUrl}/fecha/${idFecha}`);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar las categorías del torneo.' },
      { status: 500 }
    );
  }
  return response.json();
};

export const obtenerDatosTablaCategoriaTorneo = async (idCategoriaTorneo) => {
  const response = await fetch(`${baseUrl}/datos-tabla/${idCategoriaTorneo}`);
  if (!response.ok) {
    throw json(
      {
        message:
          'No pudimos cargar los datos tabla de la categoría del torneo.',
      },
      { status: 500 }
    );
  }
  return response.json();
};
