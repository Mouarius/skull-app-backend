import { Server, Socket } from 'socket.io';
import gamesServices from '../services/gamesServices';

export default (_io: Server, socket: Socket): void => {
  socket.on('fetch_game/request', (gameID: string) => {
    try {
      const game = gamesServices.findGame(gameID);
      if (game) {
        void socket.join(gameID);
        socket.emit('fetch_game/response', game);
      }
    } catch (e) {
      console.log(e);
    }
  });
};
