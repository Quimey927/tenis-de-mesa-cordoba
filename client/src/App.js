import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/user/Root';
import ErrorPage from './pages/user/Error';
import HomePage /* , { loader as homeLoader } */ from './pages/user/Home';
import EventPage, { loader as eventLoader } from './pages/user/Event';
// import AdminRoot from './pages/admin/AdminRoot';
// import AdminPage from './pages/admin/Admin';
// import PlayersAdminPage, {
//   loader as playersLoader,
// } from './pages/admin/PlayersAdmin';
// import EditPlayerPage, {
//   loader as playerLoader,
// } from './pages/admin/EditPlayer';
// import { action as manipulatePlayerAction } from './components/Admin/Players/PlayerForm';
// import NewPlayerPage from './pages/admin/NewPlayer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        // loader: homeLoader,
      },
      {
        path: './:event',
        element: <EventPage />,
        loader: eventLoader,
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
