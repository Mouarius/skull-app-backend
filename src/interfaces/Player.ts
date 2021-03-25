import { TeamColor } from '../util/types';
import Card from './Card';

export interface INewPlayer {
  username: string;
}

interface Player {
  id: string;
  username: string;
  color?: TeamColor;
  deck?: Card[];
  isReady?: boolean;
  isPlaying?: boolean;
  roundsWon?: 0 | 1 | 2;
  game_id?: string;
}

export default Player;
