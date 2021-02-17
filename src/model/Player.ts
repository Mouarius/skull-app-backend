import Deck from './Deck';
import { v4 as uuidv4 } from 'uuid';
import { TeamColor } from '../util/types';

class Player {
  color: TeamColor | null;
  username: string;
  deck: Deck | null;
  isReady: boolean;
  hasWonOneRound: boolean;
  hasWonTheGame: boolean;
  id: string;
  constructor() {
    this.color = null;
    this.username = '';
    this.deck = null;
    this.hasWonOneRound = false;
    this.hasWonTheGame = false;
    this.id = uuidv4();
    this.isReady = false;
  }

  setColor(color: TeamColor): void {
    this.color = color;
  }

  toggleReady(): void {
    this.isReady = !this.isReady;
  }

  winTheRound(): void {
    if (this.hasWonOneRound) {
      this.hasWonTheGame = true;
    } else {
      this.hasWonOneRound = true;
    }
  }
}

export default Player;
