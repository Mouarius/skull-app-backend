import express from 'express';
import { Game } from '../model/Game';
import { Player } from '../model/Player';
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
gamesRouter.post('/test/reset', (_req, res) => {
  gamesServices.resetTestGame();
  res.status(201).send({ message: 'Test game reset to default' });
});
gamesRouter.post('/test/tester_ready', (_req, res) => {
  const testGame = gamesServices.findGame('test') as Game;
  const testPlayer = testGame.players.find((p) => p.id === 'tester') as Player;
  testPlayer.toggleReady();
  res.send(testGame);
});

export default gamesRouter;
