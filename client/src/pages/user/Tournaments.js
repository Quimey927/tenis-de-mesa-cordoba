import { useLoaderData } from 'react-router-dom';

import Tournaments from '../../components/Tournaments/Tournaments';
import { getTournaments } from '../../api/index';

const TournamentsPage = () => {
  const tournaments = useLoaderData();

  return <Tournaments tournaments={tournaments} />;
};

export default TournamentsPage;

export async function loader() {
  return getTournaments();
}
