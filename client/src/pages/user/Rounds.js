import { useLoaderData } from 'react-router-dom';

import Rounds from '../../components/Rounds/Rounds';
import { getRoundsOfTheMonth } from '../../api';
import { getTournamentDays } from '../../services/utils/getTournamentDays';

const RoundsPage = () => {
  const roundsOfTheMonth = useLoaderData();

  return (
    <Rounds
      roundsOfTheMonth={roundsOfTheMonth}
      currentTournamentDays={getTournamentDays(roundsOfTheMonth)}
    />
  );
};

export default RoundsPage;

export async function loader() {
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const currentYear = currentDate.getFullYear();

  return getRoundsOfTheMonth(currentMonth, currentYear);
}
