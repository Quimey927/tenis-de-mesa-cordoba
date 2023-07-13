import { json } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/sets';

export const obtenerSets = async (idGrupo, idEliminatoria) => {
  const url = idGrupo
    ? `${baseUrl}/grupo/${idGrupo}`
    : `${baseUrl}/eliminatoria/${idEliminatoria}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar los sets.' }, { status: 500 });
  }
  return response.json();
};

export const editarSet = async (set) => {
  const response = await fetch(`${baseUrl}/${set.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(set),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos editar el set.' }, { status: 500 });
  }
};

export const crearSetsPartido = async (idPartido) => {
  const response = await fetch(`${baseUrl}/partido/${idPartido}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos crear los sets del partido.' },
      { status: 500 }
    );
  }
};

/* export const borrarSet = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos eliminar el set.' }, { status: 500 });
  }
};

export const crearSet = async (idPartido, cantSets) => {
  const response = await fetch(`${baseUrl}/partido/${idPartido}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cantSets }),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos crear el set.' }, { status: 500 });
  }
};
 */
