import { json } from 'react-router-dom';

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

export const getTournament = async (tournamentTitle, season) => {
  const response = await fetch(`${baseUrl}/${tournamentTitle}/${season}`);
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar el torneo.',
      status: 500,
    });
  }
  return response.json();
};
