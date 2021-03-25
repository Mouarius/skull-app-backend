import express from 'express';
import gamesServices from '../services/gamesServices';
import playersServices from '../services/playersServices';
import { toOwnerID } from '../util/utils';

const gamesRouter = express.Router();

gamesRouter.get('/', (_req, res) => {
  try {
    const games = gamesServices.getAllGames();
    res.status(200).json(games);
  } catch (err) {
    res.status(404).send(err);
  }
});
gamesRouter.get('/:id', (req, res) => {
  if (req.params.id) {
    try {
      const games = gamesServices.findGame(req.params.id);
      res.status(200).json(games);
    } catch (err) {
      res.status(404).send(err);
    }
  }
});

gamesRouter.post('/', (req, res) => {
  try {
    console.log(req.body);
    const owner_id: string = toOwnerID(req.body);
    console.log(owner_id);
    const owner = playersServices.findPlayer(owner_id);
    if (owner) {
      const newGame = gamesServices.addGame(owner_id);
      res.status(201).json(newGame);
    }
  } catch (error) {
    res.json(error);
  }
});

/* gamesRouter.get(`/:gameID`, (req, res) => {
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
}); */

export default gamesRouter;
