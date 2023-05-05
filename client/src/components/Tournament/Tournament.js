import classes from './Tournament.module.css';

const Tournament = ({ tournament }) => {
  const { tournamentTitle, season } = tournament;

  return (
    <div className={classes.tournament}>
      <p>{tournamentTitle}</p>
      <p>{season}</p>
    </div>
  );
};

export default Tournament;
