import { useLoaderData } from 'react-router-dom';

import Round from '../../components/Round/Round';
import { getRound } from '../../api/index';

const RoundPage = () => {
  const round = useLoaderData();

  return <Round round={round} />;
};

export default RoundPage;

export async function loader({ params }) {
  const { tournamentId, season, roundId } = params;
  return getRound(tournamentId, season, roundId);
}
