import { Server, Socket } from 'socket.io';
import gameUpdateEvent from '../events/gameUpdateEvent';
import gamesServices from '../services/gamesServices';
import playersServices from '../services/playersServices';
import logger from '../util/logger';

export default (io: Server, socket: Socket) => {
  socket.on('JOIN_LOBBY', (player_id: string, game_id: string) => {
    logger.info(
      `The player ${player_id} is trying to join the game ${game_id}`
    );
    if (gamesServices.isPlayerInGame(player_id, game_id)) {
      void socket.join(game_id);
      const player = playersServices.findPlayer(player_id);
      player.socket = socket.id;
      socket.to(game_id).emit('PLAYER_JOINED', player);
      if (game_id === 'test') {
        const game = gamesServices.findGame(game_id);
        if (game) {
          game.owner_id = player_id;
          gameUpdateEvent(io, socket, game);
        }
      }
    }
  });
};
