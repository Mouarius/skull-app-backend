/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket, Server } from 'socket.io';
import { TeamColor } from '../util/types';
import helper from '../util/helper';
import gamesServices from '../services/gamesServices';
import { toPlayer } from '../services/playerServices';

interface ChangeColorPayload {
  playerObject: any;
  color: TeamColor;
}

export default (io: Server, socket: Socket): void => {
  socket.on('lobby/change_color/request', (payload: ChangeColorPayload) => {
    // TODO : Add error handling if there is a problem and must check if color is taken or not
    try {
      const player = toPlayer(payload.playerObject);
      const { roomName } = helper.extractRoomsSet(socket.rooms);
      const game = gamesServices.findGame(roomName);
      console.log(
        '🚀 ~ file: changeColorListener.ts ~ line 20 ~ socket.on ~ roomName',
        roomName
      );
      if (game) {
        player.color = payload.color;
        game.updatePlayer(player);
      }
      socket.emit('lobby/change_color/response', player);
      io.emit('lobby/player_color_update', player);
    } catch (e) {
      console.log(e);
    }
  });
};
