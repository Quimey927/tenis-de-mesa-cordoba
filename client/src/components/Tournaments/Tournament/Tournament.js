import { Link } from 'react-router-dom';

import Button from '../../UI/Button/Button';
import {
  getEncodedTournamentUrl,
  getHyphenedTournamentPath,
} from '../../../services/utils/getEncodedUrls';
import classes from './Tournament.module.css';

const Tournament = ({ tournament }) => {
  const { title, season } = tournament;

  const encodedTournamentUrl = getEncodedTournamentUrl(title, season);
  const hyphenedTournamentPath = getHyphenedTournamentPath(title, season);

  return (
    <li
      className={classes.tournament}
      style={{
        backgroundImage: `url(/images/tournaments_images/${hyphenedTournamentPath}.jpg)`,
      }}
    >
      <div>
        <h3 className={classes['tournament__title']}>{title}</h3>
        <h4 className={classes['tournament__season']}> {season}</h4>
      </div>
      <Button className={classes.btn}>
        <Link to={`/${encodedTournamentUrl}`}>Ver torneo</Link>
      </Button>
    </li>
  );
};

export default Tournament;
