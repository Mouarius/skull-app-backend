import { Socket, Server } from 'socket.io';
import Game from '../interfaces/Game';
import gamesServices from '../services/gamesServices';

export default (_io: Server, socket: Socket): void => {
  socket.on('game/update', (game: Game) => {
    const roomName = `room/${game.id}`;
    gamesServices.updateGame(game);
    socket.to(roomName).emit('game/updated', game);
  });
};
