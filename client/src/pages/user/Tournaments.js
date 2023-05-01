import { useLoaderData } from 'react-router-dom';

import { getTournaments } from '../../api/index';

const TournamentsPage = () => {
  const tournaments = useLoaderData();

  return (
    <>
      {tournaments.map((tournament) => (
        <p key={tournament.id}>
          {tournament.title} - {tournament.season}
        </p>
      ))}
    </>
  );
};

export default TournamentsPage;

export async function loader() {
  return getTournaments();
}
