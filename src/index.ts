//* SERVER
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

//* UTILS & CONFIG
import cors from 'cors';
import config from './util/config';
//* MODELS, ROUTES, SERVICES
import gamesRouter from './routes/games';

//* SOCKET LISTENERS
import joinGameListener from './listeners/joinGameListener';
import createGameListener from './listeners/createGameListener';
import updateGameListener from './listeners/updateGameListener';
import changeColorListener from './listeners/changeColorListener';
import playerReadyListener from './listeners/playerReadyListener';
import fetchGameListener from './listeners/fetchGameListener';
import startGameListener from './listeners/startGameListener';
import setCardVisibleListener from './listeners/setCardVisibleListener';
import playCardListener from './listeners/playCardListener';
import getPlayersListener from './listeners/getPlayersListener';

// Initialize server
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    credentials: true,
  },
});

app.use(cors());
app.use('/api/games', gamesRouter);

io.on('connection', (socket: Socket) => {
  console.log('A user has connected !');
  socket.emit('hello', { message: 'Hello !!!' });
  fetchGameListener(io, socket);
  joinGameListener(io, socket);
  createGameListener(io, socket);
  updateGameListener(io, socket);
  changeColorListener(io, socket);
  playerReadyListener(io, socket);
  startGameListener(io, socket);
  setCardVisibleListener(io, socket);
  playCardListener(io, socket);
  getPlayersListener(io, socket);
});

httpServer.listen(config.PORT || 3001, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
