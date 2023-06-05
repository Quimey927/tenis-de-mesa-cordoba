import classes from './Torneo.module.css';

const Torneo = ({ torneo }) => {
  const { titulo, temporada, imagen_torneo } = torneo[0];

  return (
    <div
      className={classes.torneo}
      style={{
        backgroundImage: `${imagen_torneo}`,
        backgroundSize: 'cover',
      }}
    >
      <h1>{titulo}</h1>
      <h2>{temporada}</h2>
    </div>
  );
};

export default Torneo;
