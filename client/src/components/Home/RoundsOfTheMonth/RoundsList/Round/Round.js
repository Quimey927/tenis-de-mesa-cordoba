import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../../UI/Button/Button';
import { months } from '../../../../../services/constants/months';
import classes from './Round.module.css';

const Round = ({ round }) => {
  const [, month, startDay] = round.startDate.split('-');
  const [, , finishDay] = round.finishDate.split('-');

  const roundDays =
    finishDay !== startDay ? (
      <p>
        {+startDay} <span>y</span> {+finishDay}
      </p>
    ) : (
      <p>{+startDay}</p>
    );

  const encodedTournament = round.tournament.toLowerCase().split(' ').join('-');
  const encodedSeason = round.season.toLowerCase().split(' ').join('-');
  const encodedTitle = round.title.toLowerCase().split(' ').join('-');

  const encodedUrl = `/${encodedTournament}/${encodedSeason}/${encodedTitle}`;

  return (
    <div className={classes['round']}>
      <div className={classes['round__wrapper']}>
        <div className={`${classes['calendar']} calendar`}>
          <span className={classes['calendar__month']}>
            {months[month - 1]}
          </span>
          <div className={classes['calendar__days']}>{roundDays}</div>
        </div>
        <div className={classes['description']}>
          <p className={classes['description__tournament']}>
            {round.tournament}
          </p>
          <p className={classes['description__title']}>{round.title}</p>
          <Button className={classes.btn}>
            <Link to={encodedUrl}>Ver fecha</Link>
          </Button>
        </div>
      </div>
      <div className={classes.location}>
        <div className={classes['location__info']}>
          <p>{round.location}</p>
          <p>{round.address}</p>
        </div>
        <FontAwesomeIcon
          icon={faLocationDot}
          className={classes['location__icon']}
        />
      </div>
    </div>
  );
};

export default Round;
