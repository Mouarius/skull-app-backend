import { v4 as uuidv4 } from 'uuid';
import { Player } from '../util/types';

class Game {
  players: Player[];

  gameID: string;

  ownerID: string;

  constructor(player: Player) {
    this.players = [player];
    this.gameID = uuidv4();
    this.ownerID = player.id;
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }
}

export default Game;
