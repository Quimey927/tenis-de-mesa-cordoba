import { json } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/categoriasTorneosJugadores';

export const obtenerJugadoresDeLasCategoriasTorneos = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw json(
      {
        message:
          'No pudimos cargar los jugadores de las categorías de los torneos.',
      },
      { status: 500 }
    );
  }
  return response.json();
};

export const obtenerJugadoresDeLaCategoriaTorneo = async (
  idCategoriaTorneo
) => {
  const response = await fetch(
    `${baseUrl}/categoria-torneo/${idCategoriaTorneo}`
  );
  if (!response.ok) {
    throw json(
      {
        message: 'No pudimos cargar los jugadores de la categoría del torneo.',
      },
      { status: 500 }
    );
  }
  return response.json();
};

export const agregarJugadorACategoriaTorneo = async (infoJugador) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(infoJugador),
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

export const editarPosicionYPuntajeCategoriaTorneo = async (jugador) => {
  const response = await fetch(`${baseUrl}/${jugador.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jugador),
  });

  if (!response.ok) {
    throw json(
      {
        message: 'No pudimos editar el jugador de la categoría del torneo.',
      },
      { status: 500 }
    );
  }
};

export const borrarJugadorDeCategoriaTorneo = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json(
      {
        message: 'No pudimos eliminar el jugador de la categoría del torneo.',
      },
      { status: 500 }
    );
  }
};

export const crearNuevoJugadorCategoriaTorneo = async (
  nuevoJugador,
  idCategoriaTorneo
) => {
  const response = await fetch(`${baseUrl}/nuevo-jugador`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nuevoJugador, idCategoriaTorneo }),
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
