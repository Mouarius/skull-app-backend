import express from 'express';
import gamesServices from '../services/gamesServices';

const gamesRouter = express.Router();

gamesRouter.get('/', (_req, res) => {
  const games = gamesServices.getGames();

  res.status(200).json(games);
});

gamesRouter.get(`/:gameID`, (req, res) => {
  const { gameID } = req.params;
  const gameInList = gamesServices.findGame(gameID);
  if (gameInList) {
    res.status(200).json(gameInList);
  } else {
    res.status(404).json({ error: 'The game you requested does not exist.' });
  }
});

export default gamesRouter;
