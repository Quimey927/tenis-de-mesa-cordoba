import { useState } from 'react';

import Calendar from './Calendar/Calendar';
import RoundsList from './RoundsList/RoundsList';
import useFetchRoundsOfTheMonth from '../../hooks/useFetchRoundsOfTheMonth';
import { getTournamentDays } from '../../services/utils/getTournamentDays';
import classes from './Rounds.module.css';

const Rounds = ({ roundsOfTheMonth, currentTournamentDays }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [tournamentDays, setTournamentDays] = useState(currentTournamentDays);
  const [currentRoundsOfTheMonth, setCurrentRoundsOfTheMonth] =
    useState(roundsOfTheMonth);

  const formattedMonth = (month + 1).toString().padStart(2, '0'); // in case month is march, transform 2 to 03

  const applyData = (currRounds) => {
    setCurrentRoundsOfTheMonth(currRounds);
    setTournamentDays(getTournamentDays(currRounds));
  };

  useFetchRoundsOfTheMonth(formattedMonth, year, applyData);

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

export default Rounds;
