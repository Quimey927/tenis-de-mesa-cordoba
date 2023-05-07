import { Link } from 'react-router-dom';

import Button from '../../UI/Button/Button';
import { getEncodedTournamentUrl } from '../../../services/utils/getEncodedUrls';
import classes from './Tournament.module.css';

const Tournament = ({ tournament }) => {
  const { tournamentTitle, season, imagePath } = tournament;

  const encodedTournamentUrl = getEncodedTournamentUrl(tournamentTitle, season);

  return (
    <li
      className={classes.tournament}
      style={{
        backgroundImage: `${imagePath}`,
      }}
    >
      <div>
        <h3 className={classes['tournament__title']}>{tournamentTitle}</h3>
        <h4 className={classes['tournament__season']}> {season}</h4>
      </div>
      <Button className={classes.btn}>
        <Link to={`/${encodedTournamentUrl}`}>Ver torneo</Link>
      </Button>
    </li>
  );
};

export default Tournament;
