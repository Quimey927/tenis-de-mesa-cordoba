// la funcion obtenerArrayConDiasDelMes recibe un año y un mes, y devuelve un array de numeros
// consecutivos: los primeros {espaciosLibres} serán dejados en blanco en el calendario, y serán
// representados con números negativos, solo por propósitos de proveer un único key en
// renderizado de listas. El último número es la cantidad de días que ese mes tiene

export const obtenerArrayConDiasDelMes = (año, mes) => {
  const esAñoBisiesto =
    (año % 4 === 0 && año % 100 !== 0 && año % 400 !== 0) ||
    (año % 100 === 0 && año % 400 === 0);

  const cantDiasDeCadaMes = [
    31,
    esAñoBisiesto ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  const cantDiasMesEnCurso = cantDiasDeCadaMes[mes];

  let primerDia = new Date(año, mes, 1).getDay(); // domingo => 0, lunes => 1, ...

  // como nuestro calendario empieza en lunes, y el de JS en domingo
  // tenemos que hacer este ajuste matemático
  let espaciosLibres = (primerDia + 6) % 7;

  const arrayConDiasDelMes = [];

  // agregamos espacios vacios (representados por negativos
  // para asegurar unicidad en el atributo "key" para el renderizado de listas)
  for (let i = 1; i <= espaciosLibres; i++) {
    arrayConDiasDelMes.push(-i);
  }

  // agregamos dias del mes
  for (let i = 1; i <= cantDiasMesEnCurso; i++) {
    arrayConDiasDelMes.push(i);
  }

  return arrayConDiasDelMes;
};
