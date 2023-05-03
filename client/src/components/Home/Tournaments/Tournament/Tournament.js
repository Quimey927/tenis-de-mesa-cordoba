import { Link } from 'react-router-dom';

import ImageHermau from '../../../../assets/events_images/torneo_+30_hermau_primer_semestre_2023.jpg';
import ImageUgab from '../../../../assets/events_images/torneo_ugab_temporada_2023.png';
import ImageProvinciales from '../../../../assets/events_images/provinciales_temporada_2023.png';
import ImageLiga from '../../../../assets/events_images/liga_de_equipos_temporada_2023.jpg';
import Button from '../../../UI/Button/Button';
import classes from './Tournament.module.css';

const images = {
  4: ImageProvinciales,
  5: ImageLiga,
  6: ImageHermau,
  7: ImageUgab,
};

const Tournament = ({ tournament }) => {
  const { title, season, id } = tournament;
  const tournamentTitleUrl = title.toLowerCase().split(' ').join('-');
  const tournamentSeasonUrl = season.toLowerCase().split(' ').join('-');
  const tournamentUrl = `${tournamentTitleUrl}/${tournamentSeasonUrl}`;

  return (
    <li
      className={classes.tournament}
      style={{
        backgroundImage: `url(${images[id]})`,
      }}
    >
      <div>
        <h3 className={classes['tournament__title']}>{title}</h3>
        <h4 className={classes['tournament__season']}> {season}</h4>
      </div>
      <Button className={classes.btn}>
        <Link to={`/${tournamentUrl}`}>Ver torneo</Link>
      </Button>
    </li>
  );
};

export default Tournament;
