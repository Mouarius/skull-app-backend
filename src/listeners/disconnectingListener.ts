import { Server, Socket } from 'socket.io';
import gameUpdateEvent from '../events/gameUpdateEvent';
import gamesServices from '../services/gamesServices';
import playersServices from '../services/playersServices';
import logger from '../util/logger';

export default (io: Server, socket: Socket) => {
  const makePlayerLeave = () => {
    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        try {
          const game = gamesServices.findGame(room);
          const player = playersServices.findPlayerWithSocket(socket.id);
          if (game) {
            io.to(room).emit('PLAYER_LEFT', player);
            game.players_id = game.players_id.filter(
              (pid) => pid !== player.id
            ); // Remove the player from the players in game
            playersServices.deletePlayer(player.id); // Remove the player from the players list
            gameUpdateEvent(io, socket, game);
            logger.info(`A player has left the game : ${game.id}`);
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
  };
  socket.on('disconnecting', () => {
    makePlayerLeave();
  });
  socket.on('LEAVE_GAME', () => {
    makePlayerLeave();
  });
};
