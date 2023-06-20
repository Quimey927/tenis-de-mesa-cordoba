export const calcularCantPartidos = (n) =>
  n % 2 === 0 ? (n - 1) * (n / 2) : n * Math.floor(n / 2);
