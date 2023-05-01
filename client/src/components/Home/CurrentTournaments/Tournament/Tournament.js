import { Link } from 'react-router-dom';

import ImageHermau from '../../../../assets/events_images/torneo_+30_hermau_primer_semestre_2023.jpg';
import ImageUgab from '../../../../assets/events_images/torneo_ugab_2023.png';
import ImageProvinciales from '../../../../assets/events_images/provinciales_2023.png';
import ImageLiga from '../../../../assets/events_images/liga_equipos_2023.jpg';
import Button from '../../../UI/Button/Button';
import classes from './Tournament.module.css';

const images = {
  1: ImageProvinciales,
  2: ImageLiga,
  3: ImageHermau,
  4: ImageUgab,
};

const Tournament = ({ tournament }) => {
  const { title, season, number } = tournament;
  const tournamentTitleUrl = title.toLowerCase().split(' ').join('-');
  const tournamentSeasonUrl = season.toLowerCase().split(' ').join('-');
  const tournamentUrl = `${tournamentTitleUrl}-${tournamentSeasonUrl}`;

  return (
    <li
      className={classes.tournament}
      style={{
        backgroundImage: `url(${images[number]})`,
      }}
    >
      <div>
        <h3 className={classes['tournament__title']}>{title}</h3>
        <h4 className={classes['tournament__season']}> {season}</h4>
      </div>
      <Button className={classes.btn}>
        <Link to={`/torneos/${tournamentUrl}`}>Ver torneo</Link>
      </Button>
    </li>
  );
};

export default Tournament;
