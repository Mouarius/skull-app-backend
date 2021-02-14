import { Socket, Server } from 'socket.io';
import Game from '../model/Game';
import gamesServices from '../services/gamesServices';

export default (_io: Server, socket: Socket): void => {
  socket.on('update_game', (game: Game) => {
    const roomName = `room/${game.gameID}`;
    gamesServices.updateGame(game);
    socket.to(roomName).emit('game_updated', game);
  });
};
