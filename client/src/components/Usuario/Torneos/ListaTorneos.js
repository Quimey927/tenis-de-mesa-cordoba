import Torneo from './Torneo/Torneo';
import classes from './ListaTorneos.module.css';

const ListaTorneos = ({ torneos }) => {
  return (
    <section className={classes['torneos']}>
      <ul className={classes['lista-torneos']}>
        {torneos.map((torneo) => (
          <Torneo key={torneo.id} torneo={torneo} />
        ))}
      </ul>
    </section>
  );
};

export default ListaTorneos;
