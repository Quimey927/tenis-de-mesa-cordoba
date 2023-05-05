import classes from './Round.module.css';

const Round = ({ round }) => {
  const { roundTitle, season, tournamentTitle } = round;

  return (
    <div className={classes.round}>
      <p>{tournamentTitle}</p>
      <p>{season}</p>
      <p>{roundTitle}</p>
    </div>
  );
};

export default Round;
