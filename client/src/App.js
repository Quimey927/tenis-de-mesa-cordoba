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
import RoundPage, { loader as roundLoader } from './pages/user/Round';
import PlayersPage, { loader as playersLoader } from './pages/user/Players';

import AdminRoot from './pages/admin/AdminRoot';
import AdminPage from './pages/admin/Admin';
import LoginPage from './pages/admin/Login';

import PlayersAdminPage, {
  loader as playersAdminLoader,
} from './pages/admin/Players/Players';
import EditPlayerPage, {
  loader as playerLoader,
} from './pages/admin/Players/EditPlayer';
import { action as manipulatePlayerAction } from './components/Admin/Players/PlayerForm';
import NewPlayerPage from './pages/admin/Players/NewPlayer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/fechas" />,
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
            path: ':tournamentTitle/:season',
            element: <TournamentPage />,
            loader: tournamentLoader,
          },
        ],
      },

      {
        path: 'fechas',
        children: [
          {
            index: true,
            element: <RoundsPage />,
            loader: roundsLoader,
          },
          {
            path: ':roundName/:tournamentTitle/:season',
            element: <RoundPage />,
            loader: roundLoader,
          },
        ],
      },

      {
        path: 'jugadores',
        children: [
          {
            index: true,
            element: <PlayersPage />,
            loader: playersLoader,
          },
          /* {
            path: ':playerName',
            element: <PlayerPage />,
            loader: playerLoader,
          }, */
        ],
      },
    ],
  },

  {
    path: '/admin',
    element: <AdminRoot />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'jugadores',
        children: [
          {
            index: true,
            element: <PlayersAdminPage />,
            loader: playersAdminLoader,
          },
          {
            path: ':playerId',
            element: <EditPlayerPage />,
            loader: playerLoader,
            action: manipulatePlayerAction,
          },
          {
            path: 'nuevo',
            element: <NewPlayerPage />,
            action: manipulatePlayerAction,
          },
        ],
      },
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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
