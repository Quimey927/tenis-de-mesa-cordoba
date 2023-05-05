import Round from './Round/Round';
import classes from './RoundsList.module.css';

const RoundsList = ({ roundsOfTheMonth }) => {
  let roundsList = (
    <p className={classes['no-rounds']}>No hay fechas este mes.</p>
  );

  if (roundsOfTheMonth.length > 0) {
    roundsList = roundsOfTheMonth.map((round) => (
      <Round key={round.id} round={round} />
    ));
  }

  return <ul className={classes['rounds-list']}>{roundsList}</ul>;
};

export default RoundsList;
