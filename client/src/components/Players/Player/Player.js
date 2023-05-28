import { getFullName } from '../../../services/utils/getFullName';
import classes from './Player.module.css';

const Player = ({ player }) => {
  const {
    first_name,
    middle_name,
    last_name,
    second_last_name,
    player_image,
    club_name,
    fecoteme_category,
  } = player;

  const fullName = getFullName(
    first_name,
    middle_name,
    last_name,
    second_last_name
  );

  return (
    <li className={classes['player-item']}>
      <img src={player_image} alt="Player's thumbnail" />
      <p>{fullName}</p>
      <p>{club_name}</p>
      <p>{fecoteme_category}</p>
    </li>
  );
};

export default Player;
