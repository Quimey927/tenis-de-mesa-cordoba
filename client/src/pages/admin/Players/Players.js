import { useLoaderData } from 'react-router-dom';

import PlayersList from '../../../components/Admin/Players/PlayersList';
import { getPlayers } from '../../../api';

const Players = () => {
  const players = useLoaderData();

  return <PlayersList players={players} />;
};

export default Players;

export async function loader() {
  return getPlayers();
}
