import classes from './Round.module.css';

const Round = ({ round }) => {
  const { roundName, season, tournament } = round;

  return (
    <div className={classes.round}>
      <p>{roundName}</p>
      <p>{tournament}</p>
      <p>{season}</p>
    </div>
  );
};

export default Round;
