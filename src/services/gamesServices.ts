import Game from '../model/Game';
import _ from 'lodash';
import Player from '../model/Player';
import { TeamColor } from '../util/types';
import logger from '../util/logger';

let gamesList: Game[] = [];
console.log(process.env.NODE_ENV);

const createTestGame = (numberTestPlayers: number): Game => {
  console.log('Test game is creating...');
  const testGame = new Game();
  testGame.gameID = 'test';

  for (let i = 0; i < numberTestPlayers; i++) {
    const testPlayer = new Player();
    testPlayer.username = `The Tester ${i}`;
    testPlayer.id = `tester_${i}`;
    testPlayer.setColor(Object.values(TeamColor)[i]);
    testPlayer.toggleReady();
    testGame.addPlayer(testPlayer);
  }
  return testGame;
};

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  const testGame = createTestGame(4);
  gamesList.push(testGame);
  console.log('Test game created !');
}

const getGames = (): Game[] => {
  return gamesList;
};

/**
 * Checks if the gameID provided exists in the DB
 * @param {string} gamesList the array of the actual state of the games database
 * @param {string} gameID he gameID to find
 */

const findGame = (gameID: string): Game | undefined => {
  const gameFound = _.find(gamesList, _.matchesProperty('gameID', gameID));
  return gameFound;
};

/**
 * Updates a the given game in the gameList
 * @param {Array} gamesList the array of the actual state of the games database
 * @param {Game} gameToUpdate the game object to update
 */

const updateGame = (gameToUpdate: Game): void => {
  gamesList = gamesList.map((game) =>
    game.gameID === gameToUpdate.gameID ? gameToUpdate : game
  );
};

const resetTestGame = (): void => {
  logger.info('Resetting the test game');
  gamesList = gamesList.map((game) =>
    game.gameID === 'test' ? createTestGame(4) : game
  );
};

const addGame = (owner: Player): Game => {
  const newGame = new Game();
  newGame.addPlayer(owner);
  newGame.setOwner(owner);
  gamesList.push(newGame);
  return newGame;
};

export default {
  createTestGame,
  resetTestGame,
  getGames,
  findGame,
  updateGame,
  addGame,
};
