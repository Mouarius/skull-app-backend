import { v4 as uuidv4 } from 'uuid';
import { TeamColor } from '../util/types';
import Card from './Card';
import Player from './Player';

export class Game {
  players: Player[];

  gameID: string;

  ownerID: string;

  constructor() {
    this.players = [];
    this.gameID = uuidv4();
    this.ownerID = '';
  }

  //!!! APPERENTLY NOT WORKING

  setOwner(player: Player): void {
    this.ownerID = player.id;
  }

  filterCardsInGame(): Game {
    const updatedGame = { ...this } as Game;
    updatedGame.players.forEach((p) => {
      const filteredCards = p.deck?.cards?.filter((c) => c.isInGame) as Card[];
      if (p.deck) {
        p.deck.cards = filteredCards;
      }
    });
    return updatedGame;
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }
  updatePlayer(player: Player): void {
    this.players = this.players.map((p) => (p.id === player.id ? player : p));
  }

  isColorTaken(color: TeamColor): Player | null {
    const playerWithColor = this.players.find((p) => p.color === color);
    if (playerWithColor) {
      return playerWithColor;
    }
    return null;
  }
}

export default Game;
