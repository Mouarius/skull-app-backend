import { Game, GamePopulated } from '../interfaces/Game';
import gamesData from '../../data/games.json';
import { nanoid } from 'nanoid';
import playersServices from './playersServices';

const games: Array<Game> = gamesData;

/* const createTestGame = (numberTestPlayers: number): IGameDocument => {
  console.log('Test game is creating...');
  const testGame = new Game();
  testGame.id = 'test';

  for (let i = 0; i < numberTestPlayers; i++) {
    const testPlayer = new Player();
    testPlayer.username = `The Tester ${i}`;
    testPlayer.id = `tester_${i}`;
    testPlayer.setColor(Object.values(TeamColor)[i]);
    testPlayer.toggleReady();
    testGame.players.push(testPlayer);
  }
  return testGame;
}; */

/* if (process.env.NODE_ENV === 'DEVELOPMENT') {
  const testGame = createTestGame(4);
  gamesList.push(testGame);
  console.log('Test game created !');
} */

const getAllGames = (): Game[] => {
  return games;
};

const populate = (game: Game): GamePopulated => {
  const populatedGame: GamePopulated = {
    id: game.id,
    owner_id: game.owner_id,
    players: [],
  };
  game.players_id.forEach((pid) => {
    populatedGame.players.push(playersServices.findPlayer(pid));
  });
  return populatedGame;
};

const findGame = (gameID: string): Game | null => {
  const gameFound = games.find((game) => game.id === gameID);
  if (gameFound) {
    return gameFound;
  }
  return null;
};

const addGame = (owner_id: string): Game => {
  const newGame = { owner_id: owner_id, players_id: [owner_id], id: nanoid(8) };
  games.push(newGame);
  return newGame;
};

const addPlayerToGame = (player_id: string, game_id: string): Game => {
  // Check if the player isn't already in that game
  const game = games.find((game) => game.id === game_id);
  if (game) {
    if (game.players_id.find((pid) => pid === player_id)) {
      throw new Error(
        `The player with id "${player_id}" is already in the game`
      );
    }
    game.players_id.push(player_id);
    return game;
  }
  throw new Error('There is no game found with the id : ' + game_id);
};

const findGameWithPlayer = (
  game_id: string,
  player_id: string
): Game | null => {
  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    if (game.players_id.find((id) => id === player_id)) {
      return game;
    }
  }
  return null;
};

/* const resetTestGame = (): void => {
  logger.info('Resetting the test game');
  gamesList = gamesList.map((game) =>
    game.gameID === 'test' ? createTestGame(4) : game
  );
}; */

/* const addGame = (owner: Player): Game => {
  const newGame = new Game();
  newGame.addPlayer(owner);
  newGame.setOwner(owner);
  gamesList.push(newGame);
  return newGame;
}; */

export default {
  getAllGames,
  findGame,
  addGame,
  addPlayerToGame,
  populate,
  findGameWithPlayer,
};
