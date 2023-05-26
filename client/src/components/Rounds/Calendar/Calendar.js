import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { getCurrentMonthDaysArray } from '../../../services/utils/getCurrentMonthDaysArray';
import { months } from '../../../services/constants/months';
import classes from './Calendar.module.css';

const Calendar = ({ year, month, setYear, setMonth, tournamentDays }) => {
  const currentMonthDaysArray = getCurrentMonthDaysArray(year, month);

  const currentDate = new Date();
  const [currentDay, currentMonth, currentYear] = [
    currentDate.getDate(),
    currentDate.getMonth(),
    currentDate.getFullYear(),
  ];

  const isCurrentMonth = year === currentYear && month === currentMonth;

  const calendarBody = currentMonthDaysArray.map((day) => (
    <div
      key={day}
      style={
        tournamentDays.includes(day)
          ? {
              backgroundColor: 'rgba(0,0,0,0.3)',
            }
          : {}
      }
      className={
        day === currentDay && isCurrentMonth
          ? `${classes['day-number']} ${classes['is-current-date']}`
          : classes['day-number']
      }
    >
      {day > 0 && day}
    </div>
  ));

  const prevMonthHandler = () => {
    if (month !== 0) {
      setMonth((currMonth) => currMonth - 1);
    } else {
      setMonth(11);
      setYear((currYear) => currYear - 1);
    }
  };

  const nextMonthHandler = () => {
    if (month !== 11) {
      setMonth((currMonth) => currMonth + 1);
    } else {
      setMonth(0);
      setYear((currYear) => currYear + 1);
    }
  };

  return (
    <div className={classes.calendar}>
      <div className={classes['calendar__header']}>
        <button className={classes.btn} onClick={prevMonthHandler}>
          <FontAwesomeIcon icon={faAngleLeft} size="xl" />
        </button>
        <div className={classes['month-year']}>
          <span className={classes.month}>{months[month]}</span>
          <span className={classes.year}>{year}</span>
        </div>
        <button className={classes.btn} onClick={nextMonthHandler}>
          <FontAwesomeIcon icon={faAngleRight} size="xl" />
        </button>
      </div>

      <div className={classes['calendar__body']}>
        <div className={classes['calendar__week-day']}>
          <div>Lun</div>
          <div>Mar</div>
          <div>Mié</div>
          <div>Jue</div>
          <div>Vie</div>
          <div>Sáb</div>
          <div>Dom</div>
        </div>
        <div className={classes['calendar__days']}>{calendarBody}</div>
      </div>
    </div>
  );
};

export default Calendar;
