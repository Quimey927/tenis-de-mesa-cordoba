import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/user/Root';
import ErrorPage from './pages/user/Error';
import HomePage, { loader as homeLoader } from './pages/user/Home';
import TournamentsPage, {
  loader as tournamentsLoader,
} from './pages/user/Tournaments';
import TournamentPage, {
  loader as tournamentLoader,
} from './pages/user/Tournament';
// import AdminRoot from './pages/admin/AdminRoot';
// import AdminPage from './pages/admin/Admin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: '/torneos',
        element: <TournamentsPage />,
        loader: tournamentsLoader,
      },
      {
        path: '/torneos/:tournamentId',
        element: <TournamentPage />,
        loader: tournamentLoader,
      },
    ],
  },

  // {
  //   path: '/admin',
  //   element: <AdminRoot />,
  //   children: [
  //     {
  //       index: true,
  //       element: <AdminPage />,
  //     },
  //     {
  //       path: 'jugadores',
  //       children: [
  //         {
  //           index: true,
  //           element: <PlayersAdminPage />,
  //           loader: playersLoader,
  //         },
  //         {
  //           path: ':playerName',
  //           element: <EditPlayerPage />,
  //           loader: playerLoader,
  //           action: manipulatePlayerAction,
  //         },
  //         {
  //           path: 'nuevo',
  //           element: <NewPlayerPage />,
  //           action: manipulatePlayerAction,
  //         },
  //       ],
  //     },
  //     {
  //       path: 'eventos',
  //       children: [
  //         {
  //           index: true,
  //           element: <EventAdminPage />,
  //           loader: eventsLoader,
  //           action: manipulateEventAction
  //         },
  //         {
  //           path: ':eventName',
  //           element: <EditEventPage />,
  //           loader: eventLoader,
  //           action: manipulateEventAction
  //         },
  //         {
  //           path: 'nuevo',
  //           element: <NewEventPage />,
  //         }
  //       ],
  //     },
  //   ],
  // },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
