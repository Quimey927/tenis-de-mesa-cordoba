import { useLoaderData } from 'react-router-dom';

import TournamentForm from '../../../components/Admin/Tournaments/TournamentForm';
import { getTournamentById } from '../../../api';

const EditTournamentPage = () => {
  const tournament = useLoaderData();

  return <TournamentForm method="PUT" tournament={tournament} />;
};

export default EditTournamentPage;

export async function loader({ params }) {
  const { tournamentId } = params;

  return getTournamentById(tournamentId);
}
