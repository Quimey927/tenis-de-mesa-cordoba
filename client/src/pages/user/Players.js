import { useLoaderData } from 'react-router-dom';

import Players from '../../components/Players/Players';
import { getPlayers } from '../../api/index';

const PlayersPage = () => {
  const players = useLoaderData();

  return <Players players={players} />;
};

export default PlayersPage;

export async function loader() {
  return getPlayers();
}
