import { useState, useEffect } from 'react';

import Calendar from './Calendar/Calendar';
import RoundsList from './RoundsList/RoundsList';
import { getTournamentDays } from '../../services/utils/getTournamentDays';
import classes from './RoundsOfTheMonth.module.css';

const CurrentMonthRounds = ({ roundsOfTheMonth, currentTournamentDays }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [tournamentDays, setTournamentDays] = useState(currentTournamentDays);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [currentRoundsOfTheMonth, setCurrentRoundsOfTheMonth] =
    useState(roundsOfTheMonth);

  const formattedMonth = (month + 1).toString().padStart(2, '0'); // in case month is march, transform 2 to 03

  useEffect(() => {
    if (!isFirstRender) {
      fetch(
        `http://localhost:8080/api/rounds?month=${formattedMonth}&year=${year}`
      )
        .then((response) => response.json())
        .then((currRounds) => {
          setCurrentRoundsOfTheMonth(currRounds);
          setTournamentDays(getTournamentDays(currRounds));
        })
        .catch((err) => console.log(err));
    } else {
      setIsFirstRender(false);
    }
    // eslint-disable-next-line
  }, [month, year]);

  return (
    <section className={classes['current-month-rounds']}>
      <div className={classes['current-month-rounds__container']}>
        <Calendar
          year={year}
          month={month}
          setYear={setYear}
          setMonth={setMonth}
          className={classes.calendar}
          tournamentDays={tournamentDays}
        />
        <RoundsList roundsOfTheMonth={currentRoundsOfTheMonth} />
      </div>
    </section>
  );
};

export default CurrentMonthRounds;
