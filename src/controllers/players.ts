import express from 'express';
import Player, { INewPlayer } from '../interfaces/Player';
import playersServices from '../services/playersServices';
import { toNewPlayer } from '../util/utils';

const playersRouter = express.Router();

playersRouter.get('/', (_req, res) => {
  try {
    const players = playersServices.getAllPlayers();
    res.status(200).json(players);
  } catch (error) {
    res.json(error);
  }
});

playersRouter.post('/', (req, res) => {
  try {
    const newPlayer: INewPlayer = toNewPlayer(req.body);
    const addedPlayer: Player = playersServices.addPlayer(newPlayer);
    res.status(201).json(addedPlayer);
  } catch (e) {
    res.send(e);
  }
});

export default playersRouter;
