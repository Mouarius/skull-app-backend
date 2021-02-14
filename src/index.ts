import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import * as dotenv from 'dotenv';

import gamesRouter from './controller/gamesRouter';
import { Player } from './util/types';
import Game from './model/Game';
import gamesServices from './services/gamesServices';
import logger from './util/logger';

dotenv.config();
import config from './util/config';

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors());
app.use('/api/games', gamesRouter);

io.on('connection', (socket: Socket) => {
  socket.on('join_game/request', (gameID: string, player: Player) => {
    const gameInList = gamesServices.findGame(gameID);
    if (gameInList) {
      console.log(
        `JOIN GAME : The player ${player.username} has joined the game ${gameInList.gameID}`
      );

      gameInList.addPlayer(player);
      gamesServices.updateGame(gameInList);

      const roomName = `room/${gameInList.gameID}`;

      void socket.join(roomName);

      socket.to(roomName).emit('player_joined', { player: player });
    }
    io.emit('join_game/status', {
      game: gameInList,
    });
  });

  socket.on('create_game/request', (player: Player) => {
    const newGame = gamesServices.addGame(player);
    const roomName = `room/${newGame.gameID}`;
    void socket.join(roomName);

    logger.createGameLog(newGame);

    socket.emit('create_game/status', { status: true, game: newGame });
  });

  // socket.on('lobby/update_player_color/request', () => {

  // });

  socket.on('update_game', (game: Game) => {
    const roomName = `room/${game.gameID}`;
    gamesServices.updateGame(game);
    socket.to(roomName).emit('game_updated', { game: game });
  });
});

httpServer.listen(config.PORT || 3001, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
