import { Socket, Server } from 'socket.io';
import { TeamColor } from '../util/types';
import helper from '../util/helper';
import gamesServices from '../services/gamesServices';
import Player from '../model/Player';

interface ChangeColorPayload {
  player: Player;
  color: TeamColor;
}

export default (io: Server, socket: Socket): void => {
  socket.on('lobby/change_color/request', (payload: ChangeColorPayload) => {
    // TODO : Add error handling if there is a problem and must check if color is taken or not
    const { player } = payload;
    const { roomName } = helper.extractRoomsSet(socket.rooms);
    const game = gamesServices.findGame(roomName);
    if (game) {
      player.color = payload.color;
      game.updatePlayer(player);
    }
    socket.emit('lobby/change_color/response', player);
    io.emit('lobby/player_color_update', player);
  });
};
