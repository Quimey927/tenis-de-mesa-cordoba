import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import Raiz from './pages/Usuario/Raiz';
import PaginaError from './pages/Usuario/Error';

import PaginaTorneos, {
  loader as loaderTorneos,
} from './pages/Usuario/Torneos';
import PaginaTorneo, { loader as loaderTorneo } from './pages/Usuario/Torneo';

import PaginaFechas, { loader as loaderFechas } from './pages/Usuario/Fechas';
import PaginaFecha, { loader as loaderFecha } from './pages/Usuario/Fecha';

import PaginaJugadores, {
  loader as loaderJugadores,
} from './pages/Usuario/Jugadores';

import RaizAdmin from './pages/Admin/RaizAdmin';
import PaginaAdmin from './pages/Admin/Admin';
import PaginaLogin from './pages/Admin/Login';

import PaginaTorneosAdmin, {
  loader as loaderTorneosAdmin,
} from './pages/Admin/Torneos/Torneos';
import PaginaEditarTorneo, {
  loader as loaderTorneoAdmin,
} from './pages/Admin/Torneos/EditarTorneo';
import { action as actionManipularTorneo } from './components/Admin/Torneos/FormularioTorneo';
import PaginaNuevoTorneo from './pages/Admin/Torneos/NuevoTorneo';

import PaginaFechasAdmin, {
  loader as loaderFechasAdmin,
} from './pages/Admin/Fechas/Fechas';
import PaginaEditarFecha, {
  loader as loaderFechaAdmin,
} from './pages/Admin/Fechas/EditarFecha';
import { action as actionManipularFecha } from './components/Admin/Fechas/FormularioFecha';
import PaginaNuevaFecha from './pages/Admin/Fechas/NuevaFecha';

import PaginaJugadoresAdmin, {
  loader as loaderJugadoresAdmin,
} from './pages/Admin/Jugadores/Jugadores';
import PaginaEditarJugador, {
  loader as loaderJugadorAdmin,
} from './pages/Admin/Jugadores/EditarJugador';
import { action as actionManipularJugador } from './components/Admin/Jugadores/FormularioJugador';
import PaginaNuevoJugador from './pages/Admin/Jugadores/NuevoJugador';

import PaginaClubesAdmin, {
  loader as loaderClubesAdmin,
} from './pages/Admin/Clubes/Clubes';
import PaginaEditarClub, {
  loader as loaderClubAdmin,
} from './pages/Admin/Clubes/EditarClub';
import { action as actionManipularClub } from './components/Admin/Clubes/FormularioClub';
import PaginaNuevoClub from './pages/Admin/Clubes/NuevoClub';

import PaginaCiudadesAdmin, {
  loader as loaderCiudadesAdmin,
} from './pages/Admin/Ciudades/Ciudades';
import PaginaEditarCiudad, {
  loader as loaderCiudadAdmin,
} from './pages/Admin/Ciudades/EditarCiudad';
import { action as actionManipularCiudad } from './components/Admin/Ciudades/FormularioCiudad';
import PaginaNuevaCiudad from './pages/Admin/Ciudades/NuevaCiudad';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Raiz />,
    errorElement: <PaginaError />,
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
            element: <PaginaTorneos />,
            loader: loaderTorneos,
          },
          {
            path: ':slugTorneo',
            element: <PaginaTorneo />,
            loader: loaderTorneo,
          },
        ],
      },

      {
        path: 'fechas',
        children: [
          {
            index: true,
            element: <PaginaFechas />,
            loader: loaderFechas,
          },
          {
            path: ':slugFecha',
            element: <PaginaFecha />,
            loader: loaderFecha,
          },
        ],
      },

      {
        path: 'jugadores',
        children: [
          {
            index: true,
            element: <PaginaJugadores />,
            loader: loaderJugadores,
          },
          /* {
            path: ':idJugador',
            element: <PaginaJugador />,
            loader: loaderJugador,
          }, */
        ],
      },
    ],
  },

  {
    path: '/admin',
    element: <RaizAdmin />,
    children: [
      {
        index: true,
        element: <PaginaAdmin />,
      },
      {
        path: 'login',
        element: <PaginaLogin />,
      },

      {
        path: 'torneos',
        children: [
          {
            index: true,
            element: <PaginaTorneosAdmin />,
            loader: loaderTorneosAdmin,
          },
          {
            path: ':idTorneo',
            element: <PaginaEditarTorneo />,
            loader: loaderTorneoAdmin,
            action: actionManipularTorneo,
          },
          {
            path: 'nuevo',
            element: <PaginaNuevoTorneo />,
            loader: loaderTorneoAdmin,
            action: actionManipularTorneo,
          },
        ],
      },

      {
        path: 'fechas',
        children: [
          {
            index: true,
            element: <PaginaFechasAdmin />,
            loader: loaderFechasAdmin,
          },
          {
            path: ':idFecha',
            element: <PaginaEditarFecha />,
            loader: loaderFechaAdmin,
            action: actionManipularFecha,
          },
          {
            path: 'nuevo',
            element: <PaginaNuevaFecha />,
            loader: loaderFechaAdmin,
            action: actionManipularFecha,
          },
        ],
      },

      {
        path: 'jugadores',
        children: [
          {
            index: true,
            element: <PaginaJugadoresAdmin />,
            loader: loaderJugadoresAdmin,
          },
          {
            path: ':idJugador',
            element: <PaginaEditarJugador />,
            loader: loaderJugadorAdmin,
            action: actionManipularJugador,
          },
          {
            path: 'nuevo',
            element: <PaginaNuevoJugador />,
            loader: loaderJugadorAdmin,
            action: actionManipularJugador,
          },
        ],
      },

      {
        path: 'clubes',
        children: [
          {
            index: true,
            element: <PaginaClubesAdmin />,
            loader: loaderClubesAdmin,
          },
          {
            path: ':idClub',
            element: <PaginaEditarClub />,
            loader: loaderClubAdmin,
            action: actionManipularClub,
          },
          {
            path: 'nuevo',
            element: <PaginaNuevoClub />,
            loader: loaderClubAdmin,
            action: actionManipularClub,
          },
        ],
      },

      {
        path: 'ciudades',
        children: [
          {
            index: true,
            element: <PaginaCiudadesAdmin />,
            loader: loaderCiudadesAdmin,
          },
          {
            path: ':idCiudad',
            element: <PaginaEditarCiudad />,
            loader: loaderCiudadAdmin,
            action: actionManipularCiudad,
          },
          {
            path: 'nuevo',
            element: <PaginaNuevaCiudad />,
            loader: loaderCiudadAdmin,
            action: actionManipularCiudad,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
