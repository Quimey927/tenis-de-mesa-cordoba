import classes from './Torneo.module.css';

const Torneo = ({ torneo }) => {
  const { titulo, temporada } = torneo;

  return (
    <div className={classes.torneo}>
      <h1>{titulo}</h1>
      <h2>{temporada}</h2>
    </div>
  );
};

export default Torneo;
