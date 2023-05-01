import { useLoaderData } from 'react-router-dom';

import { getTournament } from '../../api/index';

const TournamentPage = () => {
  const tournament = useLoaderData();

  return (
    <h3>
      {tournament.title} - {tournament.season}
    </h3>
  );
};

export default TournamentPage;

export async function loader({ params }) {
  const { tournamentId } = params;
  return getTournament(tournamentId);
}
