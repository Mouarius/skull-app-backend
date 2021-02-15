import { games } from '../../data/data';
import Game from '../model/Game';
import _ from 'lodash';
import Player from '../model/Player';

const gamesList: Game[] = games;

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

const addGame = (owner: Player): Game => {
  console.log('🚀 ~ file: gamesServices.ts ~ line 37 ~ addGame ~ owner', owner);
  const newGame = new Game(owner);
  gamesList.push(newGame);
  return newGame;
};

export default { getGames, findGame, updateGame, addGame };
