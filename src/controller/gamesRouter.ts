import express from 'express';

const gamesRouter = express.Router();
import helper from '../util/helper';
import { games } from '../../data/data';

gamesRouter.get('/', (_req, res) => {
  res.status(200).json(games);
});

gamesRouter.get(`/:gameID`, (req, res) => {
  // Must check when a user accesses a game with the url, that the game exists in DB
  const { gameID } = req.params;
  // verify if the Game id is in the gamesList array
  const gameInList = helper.findGame(games, gameID);
  if (gameInList) {
    res.status(200).json(gameInList);
  } else {
    res.status(404).json({ error: 'The game you requested does not exist.' });
  }
});

export default gamesRouter;
