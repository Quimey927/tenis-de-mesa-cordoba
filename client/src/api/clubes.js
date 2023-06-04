import { json, redirect } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/clubes';

export const obtenerClubes = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar los clubes.' }, { status: 500 });
  }
  return response.json();
};

export const crearClub = async (datosClub) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosClub),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos crear el club.' }, { status: 500 });
  }

  return redirect('/admin/clubes');
};

export const obtenerClub = async (nombre) => {
  const response = await fetch(`${baseUrl}/${nombre}`);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar el club.' }, { status: 500 });
  }
  return response.json();
};

export const editarClub = async (nombre, datosClub) => {
  const response = await fetch(`${baseUrl}/${nombre}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosClub),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos editar el club.' }, { status: 500 });
  }

  return redirect('/admin/Clubes');
};

export const borrarClub = async (nombre) => {
  const response = await fetch(`${baseUrl}/${nombre}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos eliminar el club.' }, { status: 500 });
  }
};