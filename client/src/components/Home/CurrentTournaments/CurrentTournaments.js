import Tournament from './Tournament/Tournament';
import classes from './CurrentTournaments.module.css';

const CurrentTournaments = ({ tournaments }) => {
  return (
    <section className={classes['current-tournaments']}>
      <div className="container">
        <h2 className="section-title">Torneos en curso</h2>
        <ul className={classes['current-tournaments__list']}>
          {tournaments.map((tournament) => (
            <Tournament key={tournament.id} tournament={tournament} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CurrentTournaments;
