import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import classes from './Round.module.css';

const Round = ({ round }) => {
  const weekDay =
    round.weekDays.length === 1
      ? round.weekDays[0]
      : `${round.weekDays[0].substring(0, 3)}/${round.weekDays[1].substring(
          0,
          3
        )}`;

  const days =
    round.days.length === 1
      ? round.days[0]
      : `${round.days[0]} y ${round.days[1]}`;

  return (
    <li className={classes.round}>
      <div className={classes.bla}>
        <div className={classes['round__date']}>
          <span className={classes['week-day']}>{weekDay}</span>
          <span className={classes.days}>{days}</span>
        </div>
        <div className={classes['round__description']}>
          <p>{round.tournament}</p>
          <p>{round.title}</p>
        </div>
      </div>
      <div className={classes['round__location']}>
        <FontAwesomeIcon icon={faLocationDot} color="white" />
        {round.location}
      </div>
    </li>
  );
};

export default Round;
