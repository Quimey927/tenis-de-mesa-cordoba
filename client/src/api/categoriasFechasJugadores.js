import { json } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/categoriasFechasJugadores';

export const agregarJugadoresACategoriaFecha = async (
  jugadores,
  idCategoriaFecha,
  idCategoriaTorneo
) => {
  const response = await fetch(`${baseUrl}/jugadores/${idCategoriaFecha}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ jugadores, idCategoriaTorneo }),
  });

  if (!response.ok) {
    throw json(
      {
        message: 'No pudimos agregar los jugadores a la categoría de la fecha.',
      },
      { status: 500 }
    );
  }
};

export const obtenerJugadoresDeLaCategoriaFecha = async (idCategoriaFecha) => {
  const response = await fetch(
    `${baseUrl}/categoria-fecha/${idCategoriaFecha}`
  );
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar los jugadores de la categoría fecha.' },
      { status: 500 }
    );
  }
  return response.json();
};

export const editarPosicionYPuntaje = async (jugador) => {
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
        message: 'No pudimos editar el jugador de la categoría de la fecha.',
      },
      { status: 500 }
    );
  }
};

export const borrarJugadorDeCategoriaFecha = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json(
      {
        message: 'No pudimos eliminar el jugador de la categoría de la fecha.',
      },
      { status: 500 }
    );
  }
};

export const crearNuevoJugador = async (
  nuevoJugador,
  idCategoriaFecha,
  idCategoriaTorneo
) => {
  const response = await fetch(
    `${baseUrl}/categoria-fecha/${idCategoriaFecha}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nuevoJugador, idCategoriaTorneo }),
    }
  );

  if (!response.ok) {
    throw json(
      {
        message: 'No pudimos agregar el jugador a la categoría de la fecha.',
      },
      { status: 500 }
    );
  }
};
