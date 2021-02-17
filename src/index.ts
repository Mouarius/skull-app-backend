//* SERVER
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

//* UTILS & CONFIG
import cors from 'cors';
import config from './util/config';
console.log('config.PORT', config.PORT);
//* MODELS, ROUTES, SERVICES
import gamesRouter from './routes/games';

//* SOCKET LISTENERS
import joinGameListener from './listeners/joinGameListener';
import createGameListener from './listeners/createGameListener';
import updateGameListener from './listeners/updateGameListener';
import changeColorListener from './listeners/changeColorListener';
import playerReadyListener from './listeners/playerReadyListener';

// Initialize server
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
  joinGameListener(io, socket);
  createGameListener(io, socket);
  updateGameListener(io, socket);
  changeColorListener(io, socket);
  playerReadyListener(io, socket);
});

httpServer.listen(config.PORT || 3001, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
