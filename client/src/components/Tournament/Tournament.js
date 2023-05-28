import classes from './Tournament.module.css';

const Tournament = ({ tournament }) => {
  const { title, season } = tournament[0];

  return (
    <div className={classes.tournament}>
      <h1>{title}</h1>
      <h2>{season}</h2>
    </div>
  );
};

export default Tournament;
