import { useLoaderData } from 'react-router-dom';

import TournamentForm from '../../../components/Admin/Tournaments/TournamentForm';
import { getTournamentById, getTournaments } from '../../../api';

const EditTournamentPage = () => {
  const { tournament, tournaments } = useLoaderData();

  return (
    <TournamentForm
      method="PUT"
      tournament={tournament}
      tournaments={tournaments}
    />
  );
};

export default EditTournamentPage;

export async function loader({ params }) {
  const { tournamentId } = params;

  return {
    tournament: tournamentId ? await getTournamentById(tournamentId) : null,
    tournaments: await getTournaments(),
  };
}
