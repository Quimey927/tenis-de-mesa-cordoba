import { json } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api';

export async function getTournaments() {
  const response = await fetch(`${baseUrl}/tournaments`);
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar los torneos.',
      status: 500,
    });
  }
  return response.json();
}

export async function getTournament(tournamentId) {
  const response = await fetch(`${baseUrl}/tournaments/${tournamentId}`);
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar el torneo.',
      status: 500,
    });
  }
  return response.json();
}

export async function getRoundsOfTheMonth(month, year) {
  const response = await fetch(`${baseUrl}/rounds?month=${month}&year=${year}`);
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar las fechas.',
      status: 500,
    });
  }
  return response.json();
}
