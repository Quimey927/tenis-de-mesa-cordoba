// import { useLoaderData } from 'react-router-dom';

// import CurrentEvents from '../../components/Home/CurrentEvents/CurrentEvents';
// import { getCurrentEvents } from '../../api';

const HomePage = () => {
  // const currentEvents = useLoaderData();

  return (
    <>
      <div>
        <h1 className="text-center">Holaaa</h1>
        {/* <CurrentEvents events={currentEvents} /> */}
      </div>
    </>
  );
};

export default HomePage;

// export async function loader() {
//   return getCurrentEvents();
// }
