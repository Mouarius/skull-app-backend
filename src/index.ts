//* SERVER
import http from 'http';
import { Server, Socket } from 'socket.io';

//* UTILS & CONFIG
import { PORT } from './util/config';
//* MODELS, ROUTES, SERVICES

//* SOCKET LISTENERS
import app from './app';

// Initialize server
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    credentials: true,
  },
});

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
