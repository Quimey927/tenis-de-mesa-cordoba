import Tournament from './Tournament/Tournament';
import classes from './Tournaments.module.css';

const Tournaments = ({ tournaments }) => {
  return (
    <section className={classes['tournaments']}>
      <div className="container">
        <h2 className="section-title">Torneos</h2>
        <ul className={classes['tournaments__list']}>
          {tournaments.map((tournament) => (
            <Tournament key={tournament.id} tournament={tournament} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Tournaments;
