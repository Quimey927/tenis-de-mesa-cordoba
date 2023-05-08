import { useState, useEffect } from 'react';

const useFetchRoundsOfTheMonth = (formattedMonth, year, applyData) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (!isFirstRender) {
      fetch(
        `http://localhost:8080/api/rounds?month=${formattedMonth}&year=${year}`
      )
        .then((response) => response.json())
        .then((currRounds) => applyData(currRounds))
        .catch((err) => console.log(err));
    } else {
      setIsFirstRender(false);
    }
    // eslint-disable-next-line
  }, [formattedMonth]);

  return;
};

export default useFetchRoundsOfTheMonth;
