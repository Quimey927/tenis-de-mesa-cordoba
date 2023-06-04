import { Link } from 'react-router-dom';

import Button from '../../../UI/Button/Button';
import classes from './Torneo.module.css';

const Tournament = ({ torneo }) => {
  const { titulo, temporada, imagen_torneo, slug } = torneo;

  return (
    <li
      className={classes.torneo}
      style={{
        backgroundImage: `${imagen_torneo}`,
      }}
    >
      <div>
        <h3 className={classes['torneo__titulo']}>{titulo}</h3>
        <h4 className={classes['torneo__temporada']}> {temporada}</h4>
      </div>
      <Button className={classes.btn}>
        <Link to={`/torneos/${slug}`}>Ver torneo</Link>
      </Button>
    </li>
  );
};

export default Tournament;
