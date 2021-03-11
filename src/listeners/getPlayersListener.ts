import { Server, Socket } from 'socket.io';
import gamesServices from '../services/gamesServices';
export default (_io: Server, socket: Socket): void => {
  socket.on('get_players/request', (gameID: string) => {
    const game = gamesServices.findGame(gameID);
    if (game) {
      socket.emit('get_players/response', game.players);
    }
  });
};
