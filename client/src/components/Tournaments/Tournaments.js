import Tournament from './Tournament/Tournament';
import classes from './Tournaments.module.css';

const Tournaments = ({ tournaments }) => {
  return (
    <section className={classes['tournaments']}>
      <ul className={classes['tournaments__list']}>
        {tournaments.map((tournament) => (
          <Tournament key={tournament.id} tournament={tournament} />
        ))}
      </ul>
    </section>
  );
};

export default Tournaments;
