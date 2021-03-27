import { Server, Socket } from 'socket.io';
import gameUpdateEvent from '../events/gameUpdateEvent';
import gamesServices from '../services/gamesServices';
import playersServices from '../services/playersServices';

export default (io: Server, socket: Socket): void => {
  socket.on('PLAYER_READY', (player_id: string) => {
    const player = playersServices.findPlayer(player_id);
    if (player && player.game_id) {
      const game = gamesServices.findGame(player.game_id);
      if (game) {
        player.isReady = !player.isReady;
        gameUpdateEvent(io, socket, game);
      }
    }
  });
};
