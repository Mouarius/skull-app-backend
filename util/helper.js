const _ = require('lodash')

/**
 * Checks if the gameID provided exists in the DB
 * @param {string} gamesList
 * @param {string} gameID
 * @returns {exists: boolean, game: object} result {exists: boolean, game:game object or null}
 */

const findGame = (gamesList, gameID) => {
  const gameFound = _.find(gamesList, _.matchesProperty('gameID', gameID))
  // const result = { exists: false, game: null }
  // if (gameFound) {
  //   result.exists = true
  //   result.game = gameFound
  // }
  return gameFound
}

/**
 * Returns an updated version of the gamesList given in parameters
 * @param {Array} gamesList the array of the actual state of the games database
 * @param {Game} gameToUpdate the game object to update
 */

const updateGame = (gamesList, gameToUpdate) => {
  const newNamesList = gamesList.map((game) =>
    game.gameID === gameToUpdate.gameID ? gameToUpdate : game
  )
  return newNamesList
}

module.exports = { findGame, updateGame }
