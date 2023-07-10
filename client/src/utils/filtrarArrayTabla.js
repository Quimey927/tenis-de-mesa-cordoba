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
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') // elimina acentos
              .includes(
                filtro
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .toLowerCase()
              )
          )
            elemEsFiltrado = true;
        }
        return elemEsFiltrado;
      });
};
