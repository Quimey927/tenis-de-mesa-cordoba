import { json, redirect } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/tournaments';

export const getTournaments = async () => {
  const response = await fetch(`${baseUrl}`);
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar los torneos.',
      status: 500,
    });
  }
  return response.json();
};

export const createTournament = async (tournament) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tournament),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos crear el torneo.' }, { status: 500 });
  }

  return redirect('/admin/torneos');
};

export const getTournamentById = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw json({ message: 'No pudimos cargar el torneo.' }, { status: 500 });
  }
  return response.json();
};

export const getTournamentByTitle = async (tournamentTitle, season) => {
  const response = await fetch(`${baseUrl}/${tournamentTitle}/${season}`);
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar el torneo.',
      status: 500,
    });
  }
  return response.json();
};

export const updateTournament = async (id, tournament) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tournament),
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos editar el torneo.' }, { status: 500 });
  }

  return redirect('/admin/torneos');
};

export const deleteTournament = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw json({ message: 'No pudimos eliminar el torneo.' }, { status: 500 });
  }
};
