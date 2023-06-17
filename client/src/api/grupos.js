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
    `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}`
  );
};

export const obtenerGrupo = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar el grupo.' }, { status: 500 });
  }
  return response.json();
};

export const editarGrupo = async (
  id,
  datosGrupo,
  idFecha,
  idCategoriaFecha,
  idFase
) => {
  const response = await fetch(`${baseUrl}/${id}`, {
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
    `/admin/fechas/${idFecha}/editar/categorias/${idCategoriaFecha}/fases/${idFase}`
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
