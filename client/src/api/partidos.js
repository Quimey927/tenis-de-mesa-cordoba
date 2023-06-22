import { json } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/partidos';

export const obtenerPartidosDelGrupo = async (idGrupo, guardarEnEstado) => {
  const response = await fetch(`${baseUrl}/grupo/${idGrupo}`);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar los partidos del grupo.' },
      { status: 500 }
    );
  }
  const partidosDelGrupo = await response.json();
  guardarEnEstado(partidosDelGrupo);
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
