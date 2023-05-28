import { json, redirect } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/players';

export const getPlayers = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw json(
      { message: 'No pudimos cargar los jugadores.' },
      { status: 500 }
    );
  }
  return response.json();
};

export const createPlayer = async (player) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos crear el jugador.' }, { status: 500 });
  }

  return redirect('/admin/jugadores');
};

export const getPlayer = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar el jugador.' }, { status: 500 });
  }
  return response.json();
};

export const updatePlayer = async (id, player) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos editar el jugador.' }, { status: 500 });
  }

  return redirect('/admin/jugadores');
};

export const deletePlayer = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos eliminar el jugador.' }, { status: 500 });
  }
};
