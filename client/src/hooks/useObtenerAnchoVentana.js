import { useState, useEffect } from 'react';

const useObtenerAnchoVentana = () => {
  const [anchoVentana, setAnchoVentana] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setAnchoVentana(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return anchoVentana;
};

export default useObtenerAnchoVentana;
