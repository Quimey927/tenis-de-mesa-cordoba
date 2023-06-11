import { json, redirect } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/torneos';

export const obtenerTorneos = async () => {
  const response = await fetch(`${baseUrl}`);
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar los torneos.',
      status: 500,
    });
  }
  return response.json();
};

export const crearTorneo = async (datosTorneo) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosTorneo),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos crear el torneo.' }, { status: 500 });
  }

  return redirect('/admin/torneos');
};

export const obtenerTorneo = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar el torneo.' }, { status: 500 });
  }
  return response.json();
};

export const obtenerTorneoPorSlug = async (slugTorneo) => {
  const response = await fetch(`${baseUrl}/slug/${slugTorneo}`);
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar el torneo.',
      status: 500,
    });
  }
  return response.json();
};

export const editarTorneo = async (id, datosTorneo) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosTorneo),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos editar el torneo.' }, { status: 500 });
  }

  return redirect(`/admin/torneos/${id}`);
};

export const borrarTorneo = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos eliminar el torneo.' }, { status: 500 });
  }
};
