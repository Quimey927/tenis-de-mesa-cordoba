import { useLoaderData } from 'react-router-dom';

import CurrentEvents from '../../components/Home/CurrentEvents/CurrentEvents';
import { getCurrentEvents } from '../../api';

const HomePage = () => {
  const currentEvents = useLoaderData();

  return (
    <>
      <CurrentEvents events={currentEvents} />
    </>
  );
};

export default HomePage;

export async function loader() {
  return getCurrentEvents();
}
