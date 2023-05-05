import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../UI/Button/Button';
import { months } from '../../../../services/constants/months';
import {
  getHyphenedTournamentPath,
  getEncodedRoundUrl,
} from '../../../../services/utils/getEncodedUrls';
import classes from './Round.module.css';

const Round = ({ round }) => {
  const {
    roundName,
    tournament,
    season,
    startDate,
    finishDate,
    location,
    address,
  } = round;

  const [, month, startDay] = startDate.split('-');
  const [, , finishDay] = finishDate.split('-');

  const encodedRoundUrl = getEncodedRoundUrl(tournament, season, roundName);
  const hyphenedTournamentPath = getHyphenedTournamentPath(tournament, season);

  const roundDays =
    finishDay !== startDay ? (
      <p>
        {+startDay} <span>y</span> {+finishDay}
      </p>
    ) : (
      <p>{+startDay}</p>
    );

  return (
    <div
      className={classes['round']}
      style={{
        backgroundImage: `url(/images/tournaments_images/${hyphenedTournamentPath}.jpg)`,
      }}
    >
      <div className={classes['round__wrapper']}>
        <div className={`${classes['calendar']} calendar`}>
          <span className={classes['calendar__month']}>
            {months[month - 1]}
          </span>
          <div className={classes['calendar__days']}>{roundDays}</div>
        </div>
        <div className={classes['description']}>
          <p className={classes['description__tournament']}>{tournament}</p>
          <p className={classes['description__title']}>{roundName}</p>
          <Button className={classes.btn}>
            <Link to={encodedRoundUrl}>Ver fecha</Link>
          </Button>
        </div>
      </div>
      <div className={classes.location}>
        <div className={classes['location__info']}>
          <p>{location}</p>
          <p>{address}</p>
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
