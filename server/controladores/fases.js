export const obtenerFases = (req, res) => {
  const id = parseInt(req.params.idCategoriaFecha);

  const fases = [
    {
      id: 1,
      nombre: 'Fase de Grupos',
      orden: 1,
      tipo: 'L',
      torneo_id: 1,
    },
    {
      id: 2,
      nombre: 'Eliminatorias',
      orden: 2,
      tipo: 'E',
      torneo_id: 1,
    },
  ];

  res.json(fases);
};
