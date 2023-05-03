import { useLoaderData } from 'react-router-dom';

import Tournaments from '../../components/Home/Tournaments/Tournaments';
import RoundsOfTheMonth from '../../components/Home/RoundsOfTheMonth/RoundsOfTheMonth';
import { getTournaments, getRoundsOfTheMonth } from '../../api';
import { getTournamentDays } from '../../services/utils/getTournamentDays';

const HomePage = () => {
  const { tournaments, roundsOfTheMonth } = useLoaderData();

  return (
    <>
      <Tournaments tournaments={tournaments} />
      <RoundsOfTheMonth
        roundsOfTheMonth={roundsOfTheMonth}
        currentTournamentDays={getTournamentDays(roundsOfTheMonth)}
      />
    </>
  );
};

export default HomePage;

export async function loader() {
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const currentYear = currentDate.getFullYear();

  return {
    tournaments: await getTournaments(),
    roundsOfTheMonth: await getRoundsOfTheMonth(currentMonth, currentYear),
  };
}
