import { Server, Socket } from 'socket.io';
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
    }
  });
};
