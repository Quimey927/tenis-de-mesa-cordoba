import { useLoaderData } from 'react-router-dom';

import PlayerForm from '../../../components/Admin/Players/PlayerForm';
import { getPlayer } from '../../../api';

const EditPlayerPage = () => {
  const player = useLoaderData();

  return <PlayerForm method="PUT" player={player} />;
};

export default EditPlayerPage;

export async function loader({ params }) {
  const { playerId } = params;

  return getPlayer(playerId);
}
