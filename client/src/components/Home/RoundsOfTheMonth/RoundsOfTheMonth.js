import { useState, useEffect } from 'react';

import Calendar from './Calendar/Calendar';
import RoundsList from './RoundsList/RoundsList';
import classes from './RoundsOfTheMonth.module.css';

const CurrentMonthRounds = ({ roundsOfTheMonth }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [currentRoundsOfTheMonth, setCurrentRoundsOfTheMonth] =
    useState(roundsOfTheMonth);

  useEffect(() => {
    if (!isFirstRender) {
      fetch(`http://localhost:8080/api/rounds?month=${month}&year=${year}`)
        .then((response) => response.json())
        .then((currRounds) => setCurrentRoundsOfTheMonth(currRounds))
        .catch((err) => console.log(err));
    } else {
      setIsFirstRender(false);
    }
    // eslint-disable-next-line
  }, [month, year]);

  return (
    <section className={classes['current-month-rounds']}>
      <div className="container">
        <h2 className="section-title">Próximas fechas</h2>
        <div className={classes['current-month-rounds__container']}>
          <Calendar
            year={year}
            month={month}
            setYear={setYear}
            setMonth={setMonth}
            className={classes.calendar}
          />
          <RoundsList roundsOfTheMonth={currentRoundsOfTheMonth} />
        </div>
      </div>
    </section>
  );
};

export default CurrentMonthRounds;
