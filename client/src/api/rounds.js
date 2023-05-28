import { json } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api/rounds';

export const getRoundsOfTheMonth = async (month, year) => {
  const response = await fetch(`${baseUrl}?month=${month}&year=${year}`);
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar las fechas.',
      status: 500,
    });
  }
  return response.json();
};

export const getRound = async (roundName, tournamentTitle, season) => {
  const response = await fetch(
    `${baseUrl}/${roundName}/${tournamentTitle}/${season}`
  );
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar la fecha.',
      status: 500,
    });
  }
  return response.json();
};
