import { Link } from 'react-router-dom';

import ImageHermau from '../../../../assets/events_images/torneo_+30_hermau_primer_semestre_2023.jpg';
import ImageUgab from '../../../../assets/events_images/torneo_ugab_2023.png';
import ImageProvinciales from '../../../../assets/events_images/provinciales_2023.png';
import ImageLiga from '../../../../assets/events_images/liga_equipos_2023.jpg';
import classes from './Event.module.css';

const images = {
  1: ImageProvinciales,
  2: ImageLiga,
  3: ImageHermau,
  4: ImageUgab,
};

const Event = ({ event }) => {
  const { title, season, id } = event;

  return (
    <Link to={`/eventos/${id}`}>
      <div className={classes.event}>
        <img src={images[id]} alt={`Imagen del evento ${title}`} />
        <div className={classes['event__info']}>
          <h2>{title}</h2>
          <h3>{season}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Event;
