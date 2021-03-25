//* SERVER
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

//* UTILS & CONFIG
import cors from 'cors';
import { PORT } from './util/config';
//* MODELS, ROUTES, SERVICES
import gamesRouter from './controllers/games';

//* SOCKET LISTENERS
import playersRouter from './controllers/players';

// Initialize server
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    credentials: true,
  },
});

app.use(express.json());
app.use(cors());
app.use('/api/games', gamesRouter);
app.use('/api/players', playersRouter);

io.on('connection', (socket: Socket) => {
  console.log('A user has connected !');
  socket.emit('hello', { message: 'Hello !!!' });
  /* fetchGameListener(io, socket);
  joinGameListener(io, socket);
  createGameListener(io, socket);
  updateGameListener(io, socket);
  changeColorListener(io, socket);
  playerReadyListener(io, socket);
  startGameListener(io, socket);
  setCardVisibleListener(io, socket);
  playCardListener(io, socket);
  getPlayersListener(io, socket); */
});

httpServer.listen(PORT || 3001, () => {
  console.log(`Server is running on port ${PORT}`);
});
