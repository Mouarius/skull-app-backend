import { v4 as uuidv4 } from 'uuid';
import { Player } from '../util/types';

class Game {
  players: Player[];

  gameID: string;

  ownerID: string;

  constructor(player: Player) {
    console.log(
      '🚀 ~ file: Game.ts ~ line 12 ~ Game ~ constructor ~ player',
      player
    );
    this.players = [player];
    this.gameID = uuidv4();
    this.ownerID = player.id;
  }

  addPlayer(player: Player): void {
    console.log(
      '🚀 ~ file: Game.ts ~ line 22 ~ Game ~ addPlayer ~ player',
      player
    );
    this.players.push(player);
  }
}

export default Game;
