import Game from '../interfaces/game';
import gamesData from '../../data/games.json';
import { nanoid } from 'nanoid';

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
};
