export const obtenerEtapaEliminatoria = (orden) => {
  if (orden === null) return '';
  if (orden === 0) return 'Tercer Puesto';
  if (orden === 1) return 'Final';
  if (orden < 4) return 'Semifinal';
  if (orden < 8) return 'Cuartos';
  if (orden < 16) return 'Octavos';
  if (orden < 32) return '16avos';
  if (orden < 64) return '32avos';
  if (orden < 128) return '64avos';
  return 'Aguantaaaa';
};
