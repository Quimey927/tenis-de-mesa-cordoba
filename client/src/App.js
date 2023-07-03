import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import Raiz, { loader as loaderStreamActivo } from './pages/Usuario/Raiz';
import PaginaError from './pages/Usuario/Error';

import PaginaVivo from './pages/Usuario/Vivo';

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
import PaginaInfoTorneo, {
  loader as loaderInfoTorneoAdmin,
} from './pages/Admin/Torneos/InfoTorneo';

import PaginaEditarCategoriaTorneo, {
  loader as loaderCategoriaTorneoAdmin,
} from './pages/Admin/CategoriasTorneo/EditarCategoriaTorneo';
import { action as actionManipularCategoriaTorneo } from './components/Admin/CategoriasTorneo/FormularioCategoriaTorneo';
import PaginaNuevaCategoriaTorneo from './pages/Admin/CategoriasTorneo/NuevaCategoriaTorneo';

import PaginaEditarCategoriaFecha, {
  loader as loaderCategoriaFechaAdmin,
} from './pages/Admin/CategoriasFecha/EditarCategoriaFecha';
import { action as actionManipularCategoriaFecha } from './components/Admin/CategoriasFecha/FormularioCategoriaFecha';
import PaginaNuevaCategoriaFecha from './pages/Admin/CategoriasFecha/NuevaCategoriaFecha';
import PaginaInfoCategoriaFecha, {
  loader as loaderInfoCategoriaFechaAdmin,
} from './pages/Admin/CategoriasFecha/InfoCategoriaFecha';

import PaginaEditarStream, {
  loader as loaderStreamAdmin,
} from './pages/Admin/Streams/EditarStream';
import { action as actionManipularStream } from './components/Admin/Streams/FormularioStream';
import PaginaNuevoStream from './pages/Admin/Streams/NuevoStream';

import PaginaFechasAdmin, {
  loader as loaderFechasAdmin,
} from './pages/Admin/Fechas/Fechas';
import PaginaEditarFecha, {
  loader as loaderFechaAdmin,
} from './pages/Admin/Fechas/EditarFecha';
import { action as actionManipularFecha } from './components/Admin/Fechas/FormularioFecha';
import PaginaNuevaFecha from './pages/Admin/Fechas/NuevaFecha';
import PaginaInfoFecha, {
  loader as loaderInfoFechaAdmin,
} from './pages/Admin/Fechas/InfoFecha';

import PaginaEditarFase, {
  loader as loaderFaseAdmin,
} from './pages/Admin/Fases/EditarFase';
import { action as actionManipularFase } from './components/Admin/Fases/FormularioFase';
import PaginaNuevaFase from './pages/Admin/Fases/NuevaFase';
import PaginaInfoFase, {
  loader as loaderInfoFaseAdmin,
} from './pages/Admin/Fases/InfoFase';

import PaginaEditarGrupo, {
  loader as loaderGrupoAdmin,
} from './pages/Admin/Grupos/EditarGrupo';
import { action as actionManipularGrupo } from './components/Admin/Grupos/FormularioGrupo';
import PaginaNuevoGrupo from './pages/Admin/Grupos/NuevoGrupo';

import PaginaEditarEliminatoria, {
  loader as loaderEliminatoriaAdmin,
} from './pages/Admin/Eliminatorias/EditarEliminatoria';
import { action as actionManipularEliminatoria } from './components/Admin/Eliminatorias/FormularioEliminatoria';
import PaginaNuevaEliminatoria from './pages/Admin/Eliminatorias/NuevaEliminatoria';

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
    loader: loaderStreamActivo,
    errorElement: <PaginaError />,
    children: [
      {
        index: true,
        element: <Navigate to="/fechas" />,
      },

      {
        path: 'vivo',
        element: <PaginaVivo />,
        loader: loaderStreamActivo,
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
            path: 'nuevo',
            element: <PaginaNuevoTorneo />,
            loader: loaderTorneoAdmin,
            action: actionManipularTorneo,
          },
          {
            path: ':idTorneo',
            children: [
              {
                index: true,
                element: <PaginaInfoTorneo />,
                loader: loaderInfoTorneoAdmin,
              },
              {
                path: 'categorias',
                children: [
                  {
                    path: 'nuevo',
                    element: <PaginaNuevaCategoriaTorneo />,
                    loader: loaderCategoriaTorneoAdmin,
                    action: actionManipularCategoriaTorneo,
                  },
                  {
                    path: ':idCategoriaTorneo/editar',
                    element: <PaginaEditarCategoriaTorneo />,
                    loader: loaderCategoriaTorneoAdmin,
                    action: actionManipularCategoriaTorneo,
                  },
                ],
              },
              {
                path: 'editar',
                children: [
                  {
                    index: true,
                    element: <PaginaEditarTorneo />,
                    loader: loaderTorneoAdmin,
                    action: actionManipularTorneo,
                  },
                ],
              },
            ],
          },
          {
            path: ':idTorneo/editar',
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
            path: 'nuevo',
            element: <PaginaNuevaFecha />,
            loader: loaderFechaAdmin,
            action: actionManipularFecha,
          },
          {
            path: ':idFecha',
            children: [
              {
                index: true,
                element: <PaginaInfoFecha />,
                loader: loaderInfoFechaAdmin,
              },
              {
                path: 'editar',
                children: [
                  {
                    index: true,
                    element: <PaginaEditarFecha />,
                    loader: loaderFechaAdmin,
                    action: actionManipularFecha,
                  },
                  {
                    path: 'streams',
                    children: [
                      {
                        path: 'nuevo',
                        element: <PaginaNuevoStream />,
                        loader: loaderStreamAdmin,
                        action: actionManipularStream,
                      },
                      {
                        path: ':idStream/editar',
                        element: <PaginaEditarStream />,
                        loader: loaderStreamAdmin,
                        action: actionManipularStream,
                      },
                    ],
                  },
                  {
                    path: 'categorias',
                    children: [
                      {
                        path: 'nuevo',
                        element: <PaginaNuevaCategoriaFecha />,
                        loader: loaderCategoriaFechaAdmin,
                        action: actionManipularCategoriaFecha,
                      },
                      {
                        path: ':idCategoriaFecha',
                        children: [
                          {
                            index: true,
                            element: <PaginaInfoCategoriaFecha />,
                            loader: loaderInfoCategoriaFechaAdmin,
                          },
                          {
                            path: 'editar',
                            element: <PaginaEditarCategoriaFecha />,
                            loader: loaderCategoriaFechaAdmin,
                            action: actionManipularCategoriaFecha,
                          },
                          {
                            path: 'fases',
                            children: [
                              {
                                path: 'nuevo',
                                element: <PaginaNuevaFase />,
                                loader: loaderFaseAdmin,
                                action: actionManipularFase,
                              },
                              {
                                path: ':idFase',
                                children: [
                                  {
                                    index: true,
                                    element: <PaginaInfoFase />,
                                    loader: loaderInfoFaseAdmin,
                                  },
                                  {
                                    path: 'editar',
                                    element: <PaginaEditarFase />,
                                    loader: loaderFaseAdmin,
                                    action: actionManipularFase,
                                  },
                                  {
                                    path: 'grupo/:idGrupo',
                                    children: [
                                      {
                                        index: true,
                                        element: <PaginaInfoFase />,
                                        loader: loaderInfoFaseAdmin,
                                      },
                                      {
                                        path: 'partido/:idPartido',
                                        element: <PaginaInfoFase />,
                                        loader: loaderInfoFaseAdmin,
                                      },
                                      {
                                        path: 'editar',
                                        element: <PaginaEditarGrupo />,
                                        loader: loaderGrupoAdmin,
                                        action: actionManipularGrupo,
                                      },
                                      {
                                        path: 'nuevo',
                                        element: <PaginaNuevoGrupo />,
                                        loader: loaderGrupoAdmin,
                                        action: actionManipularGrupo,
                                      },
                                    ],
                                  },
                                  {
                                    path: 'eliminatoria/:idEliminatoria',
                                    children: [
                                      {
                                        index: true,
                                        element: <PaginaInfoFase />,
                                        loader: loaderInfoFaseAdmin,
                                      },
                                      {
                                        path: 'partido/:idPartido',
                                        element: <PaginaInfoFase />,
                                        loader: loaderInfoFaseAdmin,
                                      },
                                      {
                                        path: 'editar',
                                        element: <PaginaEditarEliminatoria />,
                                        loader: loaderEliminatoriaAdmin,
                                        action: actionManipularEliminatoria,
                                      },
                                      {
                                        path: 'nuevo',
                                        element: <PaginaNuevaEliminatoria />,
                                        loader: loaderEliminatoriaAdmin,
                                        action: actionManipularEliminatoria,
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
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
            path: 'nuevo',
            element: <PaginaNuevoJugador />,
            loader: loaderJugadorAdmin,
            action: actionManipularJugador,
          },
          {
            path: ':idJugador/editar',
            element: <PaginaEditarJugador />,
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
            path: 'nuevo',
            element: <PaginaNuevoClub />,
            loader: loaderClubAdmin,
            action: actionManipularClub,
          },
          {
            path: ':idClub/editar',
            element: <PaginaEditarClub />,
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
            path: 'nuevo',
            element: <PaginaNuevaCiudad />,
            loader: loaderCiudadAdmin,
            action: actionManipularCiudad,
          },
          {
            path: ':idCiudad/editar',
            element: <PaginaEditarCiudad />,
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
