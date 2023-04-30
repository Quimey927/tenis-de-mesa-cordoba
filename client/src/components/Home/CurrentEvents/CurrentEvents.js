import Event from './Event/Event';

const CurrentEvents = ({ events }) => {
  return (
    <>
      {events.map((evt) => (
        <Event event={evt} />
      ))}
    </>
  );
};

export default CurrentEvents;
