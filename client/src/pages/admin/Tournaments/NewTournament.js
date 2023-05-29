import { useLoaderData } from 'react-router-dom';

import TournamentForm from '../../../components/Admin/Tournaments/TournamentForm';

const NewTournamentPage = () => {
  const { tournaments } = useLoaderData();

  return <TournamentForm method="POST" tournaments={tournaments} />;
};

export default NewTournamentPage;
