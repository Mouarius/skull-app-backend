import { Server, Socket } from 'socket.io';
import gameUpdateEvent from '../events/gameUpdateEvent';
import gamesServices from '../services/gamesServices';
import playersServices from '../services/playersServices';

export default (io: Server, socket: Socket) => {
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        const game = gamesServices.findGame(room);
        const player = playersServices.findPlayerWithSocket(socket.id);
        if (game) {
          io.to(room).emit('PLAYER_LEFT', player);
          game?.players_id.filter((pid) => pid !== player.id); // Remove the player from the players in game
          playersServices.deletePlayer(player.id); // Remove the player from the players list
          gameUpdateEvent(io, socket, game);
        }
      }
    });
  });
};
