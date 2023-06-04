export const obtenerNombreCompleto = (
  nombre,
  segundo_nombre,
  apellido,
  segundo_apellido
) => {
  return `${
    segundo_apellido
      ? `${apellido.toUpperCase()} ${segundo_apellido.toUpperCase()},`
      : `${apellido.toUpperCase()},`
  } ${segundo_nombre ? `${nombre} ${segundo_nombre}` : nombre}`;
};
