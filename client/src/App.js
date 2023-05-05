import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import RootLayout from './pages/user/Root';
import ErrorPage from './pages/user/Error';
import TournamentsPage, {
  loader as tournamentsLoader,
} from './pages/user/Tournaments';
import TournamentPage, {
  loader as tournamentLoader,
} from './pages/user/Tournament';
import RoundsPage, { loader as roundsLoader } from './pages/user/Rounds';
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
        element: <Navigate to="/torneos" />,
      },
      {
        path: 'torneos',
        children: [
          {
            index: true,
            element: <TournamentsPage />,
            loader: tournamentsLoader,
          },
          {
            path: ':tournamentId',
            element: <TournamentPage />,
            loader: tournamentLoader,
          },
        ],
      },
      {
        path: 'fechas',
        element: <RoundsPage />,
        loader: roundsLoader,
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
