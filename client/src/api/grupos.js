import { json, redirect } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/grupos';

export const obtenerGrupos = async (idFase) => {
  const response = await fetch(`${baseUrl}/fase/${idFase}`);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar los grupos.' }, { status: 500 });
  }
  return response.json();
};

export const crearGrupo = async (
  idGrupo,
  datosGrupo,
  idFecha,
  idCategoriaFecha,
  idFase
) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosGrupo),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos crear el grupo.' }, { status: 500 });
  }

  return redirect(
    `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}/grupo/${idGrupo}`
  );
};

export const crearGrupos = async (datosGrupo) => {
  const response = await fetch(`${baseUrl}/crear-grupos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosGrupo),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos crear los grupos.' }, { status: 500 });
  }
};

export const obtenerGrupo = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar el grupo.' }, { status: 500 });
  }
  return response.json();
};

export const editarGrupo = async (
  idGrupo,
  datosGrupo,
  idFecha,
  idCategoriaFecha,
  idFase
) => {
  const response = await fetch(`${baseUrl}/${idGrupo}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosGrupo),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos editar el grupo.' }, { status: 500 });
  }

  return redirect(
    `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}/grupo/${idGrupo}`
  );
};

export const borrarGrupo = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos eliminar el grupo.' }, { status: 500 });
  }
};
