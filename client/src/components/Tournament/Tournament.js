import classes from './Tournament.module.css';

const Tournament = ({ tournament }) => {
  const { tournamentTitle, season } = tournament;

  return (
    <div className={classes.tournament}>
      <h1>{tournamentTitle}</h1>
      <h2>{season}</h2>
    </div>
  );
};

export default Tournament;
