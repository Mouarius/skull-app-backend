import _ from 'lodash';
import Game from '../model/Game';

/**
 * Checks if the gameID provided exists in the DB
 * @param {string} gamesList the array of the actual state of the games database
 * @param {string} gameID he gameID to find
 */

const findGame = (games: Game[], gameID: string): Game | undefined => {
  const gameFound = _.find(games, _.matchesProperty('gameID', gameID));
  return gameFound;
};

/**
 * Returns an updated version of the gamesList given in parameters
 * @param {Array} gamesList the array of the actual state of the games database
 * @param {Game} gameToUpdate the game object to update
 */

const updateGame = (games: Game[], gameToUpdate: Game): Game[] => {
  const newNamesList = games.map((game) =>
    game.gameID === gameToUpdate.gameID ? gameToUpdate : game
  );
  return newNamesList;
};

export default { findGame, updateGame };
