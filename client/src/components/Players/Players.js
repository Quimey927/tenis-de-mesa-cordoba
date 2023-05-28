import Player from './Player/Player';
import classes from './Players.module.css';

const Players = ({ players }) => {
  return (
    <ul className={classes['players-list']}>
      {players.map((player) => (
        <Player key={player.id} player={player} />
      ))}
    </ul>
  );
};

export default Players;
