import { useLoaderData } from 'react-router-dom';

import TournamentsList from '../../../components/Admin/Tournaments/TournamentsList';
import { getTournaments } from '../../../api';

const Tournaments = () => {
  const tournaments = useLoaderData();

  return <TournamentsList tournaments={tournaments} />;
};

export default Tournaments;

export async function loader() {
  return getTournaments();
}
