export interface INewGame {
  players_id: string[];
  owner_id: string;
}

interface Game {
  players_id: string[];
  id: string;
  owner_id: string;
}

export default Game;
