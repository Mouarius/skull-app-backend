/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server, Socket } from 'socket.io';
import gameUpdateEvent from '../events/gameUpdateEvent';
import gamesServices from '../services/gamesServices';
import playersServices from '../services/playersServices';
import { TeamColor } from '../util/types';

export default (io: Server, socket: Socket): void => {
  socket.on('CHANGE_COLOR', (player_id: string, color: TeamColor) => {
    // TODO : Add error handling if there is a problem and must check if color is taken or not
    try {
      const player = playersServices.findPlayer(player_id);
      if (player) {
        if (player.game_id) {
          player.color = color;
          const game = gamesServices.findGame(player.game_id);
          if (game) {
            gameUpdateEvent(io, socket, game);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  });
};
