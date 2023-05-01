import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { getCurrentMonthDaysArray } from '../../../../services/utils/getCurrentMonthDaysArray';
import { months } from '../../../../services/constants/months';
import classes from './Calendar.module.css';

const Calendar = ({ year, month, setYear, setMonth }) => {
  const currentMonthDaysArray = getCurrentMonthDaysArray(year, month);

  const calendarBody = currentMonthDaysArray.map((day) => (
    <div key={day}>{day > 0 && day}</div>
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
