import { json, redirect } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/ciudades';

export const obtenerCiudades = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar las ciudades.' }, { status: 500 });
  }
  return response.json();
};

export const crearCiudad = async (datosCiudad) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosCiudad),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos crear la ciudad.' }, { status: 500 });
  }

  return redirect('/admin/ciudades');
};

export const obtenerCiudad = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar la ciudad.' }, { status: 500 });
  }
  return response.json();
};

export const editarCiudad = async (id, datosCiudad) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosCiudad),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos editar la ciudad.' }, { status: 500 });
  }

  return redirect('/admin/ciudades');
};

export const borrarCiudad = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos eliminar la ciudad.' }, { status: 500 });
  }
};
