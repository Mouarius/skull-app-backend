import { Game, GamePopulated } from '../interfaces/Game';
import { nanoid } from 'nanoid';
import playersServices from './playersServices';
import testData from '../../data/testData.json';
import gamesData from '../../data/games.json';

let games: Game[] = gamesData;

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

const resetTestGame = () => {
  games = games.filter((g) => g.id !== 'test');
  initializeTestGame();
  playersServices.resetTestPlayers();
};

const initializeTestGame = () => {
  games.push(testData.testGame);
  playersServices.initializeTestPlayers();
};

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
    try {
      const player = playersServices.findPlayer(pid);
      populatedGame.players.push(player);
    } catch (e) {
      console.log(e);
    }
  });
  return populatedGame;
};

const findGame = (game_id: string): Game | null => {
  const gameFound = games.find((game) => game.id === game_id);
  if (gameFound) {
    return gameFound;
  }
  return null;
};

const addGame = (owner_id: string): Game => {
  const newGame = { owner_id: owner_id, players_id: [owner_id], id: nanoid(8) };
  const owner = playersServices.findPlayer(owner_id);
  owner.game_id = newGame.id;
  games.push(newGame);
  return newGame;
};

const addPlayerToGame = (player_id: string, game_id: string): Game => {
  // Check if the player isn't already in that game
  const player = playersServices.findPlayer(player_id);
  const game = games.find((game) => game.id === game_id);
  if (game && player) {
    if (game.players_id.find((pid) => pid === player_id)) {
      throw new Error(
        `The player with id "${player_id}" is already in the game`
      );
    }
    game.players_id.push(player_id);
    player.game_id = game_id;
    return game;
  }
  throw new Error('There is no game found with the id : ' + game_id);
};

const isPlayerInGame = (player_id: string, game_id: string): boolean => {
  const game = findGame(game_id);
  if (game) {
    return game.players_id.find((pid) => pid === player_id) ? true : false;
  }
  return false;
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

export default {
  getAllGames,
  findGame,
  addGame,
  addPlayerToGame,
  populate,
  findGameWithPlayer,
  isPlayerInGame,
  initializeTestGame,
  resetTestGame,
};
