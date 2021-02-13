const gamesRouter = require('express').Router()
const helper = require('../util/helper')
const { gamesList } = require('../data')

gamesRouter.get('/', (req, res) => {
  res.status(200).json(gamesList)
})

gamesRouter.get(`/:gameID`, (req, res) => {
  // Must check when a user accesses a game with the url, that the game exists in DB
  const { gameID } = req.params
  // verify if the Game id is in the gamesList array
  const gameInList = helper.findGame(gamesList, gameID)
  if (gameInList) {
    res.status(200).json(gameInList)
  } else {
    res.status(404).json({ error: 'The game you requested does not exist.' })
  }
})
module.exports = gamesRouter
