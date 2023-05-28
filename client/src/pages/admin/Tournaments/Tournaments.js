import { useLoaderData } from 'react-router-dom';

import TournamentsList from '../../../components/Admin/Tournaments/TournamentsList';

const Tournaments = () => {
  const tournaments = useLoaderData();

  return <TournamentsList tournaments={tournaments} />;
};

export default Tournaments;
