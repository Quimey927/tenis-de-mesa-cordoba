import { Link } from 'react-router-dom';

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
      <div className={classes.btn}>
        <Link to={`/torneos/${slug}`}>Ver torneo</Link>
      </div>
    </li>
  );
};

export default Tournament;
