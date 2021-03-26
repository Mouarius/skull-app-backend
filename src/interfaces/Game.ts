import Player from './Player';

export interface INewGame {
  players_id: string[];
  owner_id: string;
}

interface GameBase {
  id: string;
  owner_id: string;
}
export interface Game extends GameBase {
  players_id: string[];
}
export interface GamePopulated extends GameBase {
  players: Player[];
}
