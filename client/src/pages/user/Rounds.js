import { useLoaderData } from 'react-router-dom';

import RoundsOfTheMonth from '../../components/RoundsOfTheMonth/RoundsOfTheMonth';
import { getRoundsOfTheMonth } from '../../api';
import { getTournamentDays } from '../../services/utils/getTournamentDays';

const RoundsPage = () => {
  const roundsOfTheMonth = useLoaderData();

  return (
    <RoundsOfTheMonth
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
