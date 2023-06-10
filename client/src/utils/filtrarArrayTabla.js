export const filtrarArrayTabla = (filtro, array, encabezadosColumnas) => {
  return filtro.trim() === ''
    ? array
    : array.filter((elem) => {
        let elemEsFiltrado = false;
        for (let columna of encabezadosColumnas) {
          if (
            elem[columna]
              .toString()
              .toLowerCase()
              .includes(filtro.toLowerCase())
          )
            elemEsFiltrado = true;
        }
        return elemEsFiltrado;
      });
};
