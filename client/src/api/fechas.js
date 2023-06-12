import { json, redirect } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/fechas';

export const obtenerFechasDelMes = async (mes, año) => {
  const response = await fetch(
    `${baseUrl}/fechas-del-mes?mes=${mes}&año=${año}`
  );
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar las fechas.',
      status: 500,
    });
  }
  return response.json();
};

export const obtenerFechas = async () => {
  const response = await fetch(`${baseUrl}`);
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar las fechas.',
      status: 500,
    });
  }
  return response.json();
};

export const obtenerFechasTorneo = async (idTorneo) => {
  const response = await fetch(`${baseUrl}/torneo/${idTorneo}`);
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar las fechas del torneo.',
      status: 500,
    });
  }
  return response.json();
};

export const crearFecha = async (datosFecha, idTorneo) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosFecha),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos crear la fecha.' }, { status: 500 });
  }

  return redirect(`/admin/torneos/${idTorneo}`);
};

export const obtenerFecha = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar la fecha.' }, { status: 500 });
  }
  return response.json();
};

export const obtenerFechaPorSlug = async (slugFecha) => {
  const response = await fetch(`${baseUrl}/slug/${slugFecha}`);
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar la fecha.',
      status: 500,
    });
  }
  return response.json();
};

export const editarFecha = async (id, datosFecha) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosFecha),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos editar la fecha.' }, { status: 500 });
  }

  return redirect(`/admin/fechas/${id}`);
};

export const borrarFecha = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos eliminar la fecha.' }, { status: 500 });
  }
};
