import Game from '../model/Game';
import _ from 'lodash';
import Player from '../model/Player';
import { TeamColor } from '../util/types';

const gamesList: Game[] = [];
console.log(process.env.NODE_ENV);

const createTestGame = (numberTestPlayers: number): Game => {
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
  gamesList.concat(createTestGame(4));
  console.log('🚀 ~ file: gamesServices.ts ~ line 26 ~ gamesList', gamesList);
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
 * Returns an updated version of the gamesList given in parameters
 * @param {Array} gamesList the array of the actual state of the games database
 * @param {Game} gameToUpdate the game object to update
 */

const updateGame = (gameToUpdate: Game): Game[] => {
  gamesList.map((game) =>
    game.gameID === gameToUpdate.gameID ? gameToUpdate : game
  );
  return gamesList;
};

const resetTestGame = (): Game[] => {
  return gamesList.map((game) =>
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
