import { useLoaderData } from 'react-router-dom';

import EventHeader from '../../components/Event/EventHeader/EventHeader';
import { getEvent } from '../../api/index';

const EventPage = () => {
  const event = useLoaderData();
  const { title } = event;

  return (
    <>
      <EventHeader title={title} />
    </>
  );
};

export default EventPage;

export async function loader({ params }) {
  const eventId = params.event;
  return getEvent(eventId);
}
