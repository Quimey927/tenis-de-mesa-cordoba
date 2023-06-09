import { json, redirect } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/streams';

export const obtenerStreams = async (idFecha) => {
  const response = await fetch(`${baseUrl}/fecha/${idFecha}`);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar los streams.' }, { status: 500 });
  }
  return response.json();
};

export const crearStream = async (idFecha, datosStream) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosStream),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos crear el stream.' }, { status: 500 });
  }

  return redirect(`/admin/fechas/${idFecha}`);
};

export const obtenerStream = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar el stream.' }, { status: 500 });
  }
  return response.json();
};

export const editarStream = async (idStream, idFecha, datosStream) => {
  const response = await fetch(`${baseUrl}/${idStream}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosStream),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos editar el stream.' }, { status: 500 });
  }

  return redirect(`/admin/fechas/${idFecha}`);
};

export const borrarStream = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos eliminar el stream.' }, { status: 500 });
  }
};
