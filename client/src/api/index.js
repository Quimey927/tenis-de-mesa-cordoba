import { json } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/api';

export async function getCurrentEvents() {
  const response = await fetch(`${baseUrl}/events`);
  if (!response.ok) {
    throw json({
      message: 'No pudimos cargar los eventos actuales.',
      status: 500,
    });
  }
  return response.json();
}

export async function getEvent(eventId) {}

export async function getPlayer(playerId) {}
