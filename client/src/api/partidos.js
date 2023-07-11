import { json } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/partidos';

export const obtenerPartidosDelGrupo = async (idGrupo) => {
  const response = await fetch(`${baseUrl}/grupo/${idGrupo}`);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar los partidos del grupo.' },
      { status: 500 }
    );
  }
  return response.json();
};

export const crearPartidosDelGrupo = async (idGrupo, datosPartidos) => {
  const response = await fetch(`${baseUrl}/grupo/${idGrupo}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosPartidos),
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos crear los partidos del grupo.' },
      { status: 500 }
    );
  }
};

export const intercambiarJugadoresPartido = async (idPartido) => {
  const response = await fetch(`${baseUrl}/intercambio/${idPartido}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos intercambiar los jugadores del partido.' },
      { status: 500 }
    );
  }
};

export const editarPartido = async (partidoEditandose) => {
  const response = await fetch(`${baseUrl}/${partidoEditandose.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(partidoEditandose),
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos cambiar el orden del partido.' },
      { status: 500 }
    );
  }
};

export const editarSetsPartido = async (partido) => {
  const response = await fetch(`${baseUrl}/sets/${partido.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(partido),
  });

  if (!response.ok) {
    throw json(
      { message: 'No pudimos cambiar el orden del partido.' },
      { status: 500 }
    );
  }
};

export const obtenerPartidosDeLaEliminatoria = async (idEliminatoria) => {
  const response = await fetch(`${baseUrl}/eliminatoria/${idEliminatoria}`);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar los partidos de la eliminatoria.' },
      { status: 500 }
    );
  }
  return response.json();
};

export const crearPartidosDeLaEliminatoria = async (
  datosPartidosEliminatoria
) => {
  const response = await fetch(
    `${baseUrl}/eliminatoria/${datosPartidosEliminatoria.idEliminatoria}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosPartidosEliminatoria),
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'No pudimos crear los partidos de la eliminatoria.' },
      { status: 500 }
    );
  }
};

export const borrarPartido = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json(
      {
        message: 'No pudimos eliminar el partido de la instancia.',
      },
      { status: 500 }
    );
  }
};

export const crearPartido = async (idGrupo, idEliminatoria, dia) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idGrupo, idEliminatoria, dia }),
  });

  if (!response.ok) {
    throw json(
      {
        message: 'No pudimos agregar el jugador a la categoría del torneo.',
      },
      { status: 500 }
    );
  }
};
