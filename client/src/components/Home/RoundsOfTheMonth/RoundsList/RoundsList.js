import classes from './RoundsList.module.css';

const RoundsList = ({ roundsOfTheMonth }) => {
  let roundsList = <p className="text-center">No hay fechas este mes.</p>;

  if (roundsOfTheMonth.length > 0) {
    roundsList = roundsOfTheMonth.map((round) => (
      <li key={round.title}>{round.title}</li>
    ));
  }

  return <ul className={classes['rounds-list']}> {roundsList} </ul>;
};

export default RoundsList;
