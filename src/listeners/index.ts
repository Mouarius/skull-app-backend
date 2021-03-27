import { Server, Socket } from 'socket.io';
import changeColorListener from './changeColorListener';
import disconnectingListener from './disconnectingListener';
import joinLobbyListener from './joinLobbyListener';
import playerReadyListener from './playerReadyListener';

export default (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('A user has connected !');

    joinLobbyListener(io, socket);
    disconnectingListener(io, socket);
    changeColorListener(io, socket);
    playerReadyListener(io, socket);

    // startGameListener(io, socket);
    // setCardVisibleListener(io, socket);
    // playCardListener(io, socket);
    // getPlayersListener(io, socket);
  });
  return io;
};
