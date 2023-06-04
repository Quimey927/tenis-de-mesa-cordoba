import { useState, useEffect } from 'react';

const useObtenerFechasDelMes = (mesFormateado, año, guardarEnEstado) => {
  const [esPrimerRenderizado, setEsPrimerRenderizado] = useState(true);

  useEffect(() => {
    if (!esPrimerRenderizado) {
      fetch(
        `http://localhost:8080/api/fechas/fechas-del-mes?mes=${mesFormateado}&año=${año}`
      )
        .then((response) => response.json())
        .then((fechasDelMes) => guardarEnEstado(fechasDelMes))
        .catch((err) => console.log(err));
    } else {
      setEsPrimerRenderizado(false);
    }
    // eslint-disable-next-line
  }, [mesFormateado]);

  return;
};

export default useObtenerFechasDelMes;
