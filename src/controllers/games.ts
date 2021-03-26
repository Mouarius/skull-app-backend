import express, { Request, Response } from 'express';
import gamesServices from '../services/gamesServices';
import playersServices from '../services/playersServices';

const gamesRouter = express.Router();

gamesRouter.get('/', (_req, res, next) => {
  try {
    const games = gamesServices.getAllGames();
    res.status(200).json(games);
  } catch (e) {
    next(e);
  }
});
gamesRouter.get('/:id', (req, res, next) => {
  if (req.params.id) {
    try {
      const games = gamesServices.findGame(req.params.id);
      res.status(200).json(games);
    } catch (e) {
      next(e);
    }
  }
});

gamesRouter.post('/', (req: Request, res: Response, next) => {
  try {
    const { owner_id } = req.body as { owner_id: string };
    const owner = playersServices.findPlayer(owner_id);
    if (owner) {
      const newGame = gamesServices.addGame(owner_id);
      res.status(201).json(newGame);
    }
  } catch (e) {
    next(e);
  }
});

gamesRouter.post('/join/:id', (req: Request, res: Response, next) => {
  try {
    const { player_id } = req.body as { player_id: string };
    const player = playersServices.findPlayer(player_id);
    if (player) {
      const updatedGame = gamesServices.addPlayerToGame(
        player.id,
        req.params.id
      );
      res.status(200).json(updatedGame);
    }
  } catch (e) {
    next(e);
  }
});

export default gamesRouter;
