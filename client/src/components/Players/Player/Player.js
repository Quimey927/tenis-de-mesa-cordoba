import classes from './Player.module.css';

const Player = ({ player }) => {
  return (
    <li className={classes['player-item']}>
      <p>{player.name}</p>
      <p>{player.club}</p>
    </li>
  );
};

export default Player;
