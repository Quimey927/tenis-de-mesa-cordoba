// esta funcion recibe como parámetro los colores de la tabla, tal como vienen
// de la base, y lo que hace es desglosar las posiciones que posiblemente
// vienen juntas por cómo está estructurada la base (posiciones: '1,2')

export const obtenerColoresFila = (coloresTabla) => {
  const coloresFila = [];

  if (coloresTabla.length > 0) {
    coloresTabla.forEach((color) => {
      const posicionesColor = color.posiciones.trim().split(',');
      posicionesColor.forEach((pos) => {
        coloresFila.push({ posicion: pos, color: color.color });
      });
    });
  }

  return coloresFila;
};

// esta función trabaja con los coloresFila obtenidos en la función anterior,
// y dada una posición, detecta el color de la fila cuya posición es la ingresada

export const encontrarColorFila = (coloresFila, pos) => {
  const fila = coloresFila.find((fila) => fila.posicion === pos.toString());
  if (!fila) return 'none';
  return fila.color;
};
