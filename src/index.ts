//* SERVER
import http from 'http';
import { Server } from 'socket.io';
import app from './app';
//* SOCKET LISTENERS
import rootSocket from './listeners/index';
//* MODELS, ROUTES, SERVICES
import gamesServices from './services/gamesServices';
//* UTILS & CONFIG
import { PORT } from './util/config';

// Initialize server
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    credentials: true,
  },
});

void gamesServices.initializeTestGame();

rootSocket(io);

httpServer.listen(PORT || 3001, () => {
  console.log(`Server is running on port ${PORT}`);
});
