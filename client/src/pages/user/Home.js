import { useLoaderData } from 'react-router-dom';

import CurrentTournaments from '../../components/Home/CurrentTournaments/CurrentTournaments';
import RoundsOfTheMonth from '../../components/Home/RoundsOfTheMonth/RoundsOfTheMonth';
import { getCurrentTournaments, getRoundsOfTheMonth } from '../../api';

const HomePage = () => {
  const { currentTournaments, roundsOfTheMonth } = useLoaderData();

  return (
    <>
      <CurrentTournaments tournaments={currentTournaments} />
      <RoundsOfTheMonth roundsOfTheMonth={roundsOfTheMonth} />
    </>
  );
};

export default HomePage;

export async function loader() {
  const currentDay = new Date();
  const currentMonth = currentDay.getMonth();
  const currentYear = currentDay.getFullYear();

  return {
    currentTournaments: await getCurrentTournaments(),
    roundsOfTheMonth: await getRoundsOfTheMonth(currentMonth, currentYear),
  };
}
