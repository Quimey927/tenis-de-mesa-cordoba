import { json } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/colores-tabla';

export const obtenerColoresTabla = async (idGrupo) => {
  const response = await fetch(`${baseUrl}/grupo/${idGrupo}`);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar los colores de la tabla.' },
      { status: 500 }
    );
  }
  return response.json();
};

export const crearColoresTabla = async (coloresYGrupos) => {
  const response = await fetch(`${baseUrl}/crear-colores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(coloresYGrupos),
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos crear los colores de los grupos.' },
      { status: 500 }
    );
  }
};

export const editarColorTabla = async (color) => {
  const response = await fetch(`${baseUrl}/${color.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(color),
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos editar el color de la tabla.' },
      { status: 500 }
    );
  }
};

export const borrarColorTabla = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos eliminar el color de la tabla.' },
      { status: 500 }
    );
  }
};

export const crearColorTabla = async (nuevoColor, idGrupo) => {
  const response = await fetch(`${baseUrl}/grupo/${idGrupo}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevoColor),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos crear el color.' }, { status: 500 });
  }
};
