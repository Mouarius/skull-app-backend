import { Socket, Server } from 'socket.io';
import { TeamColor } from '../util/types';
import helper from '../util/helper';
import gamesServices from '../services/gamesServices';
import Player from '../model/Player';

interface ChangeColorPayload {
  player: Player;
  color: TeamColor;
}

export default (_io: Server, socket: Socket): void => {
  socket.on('change_color/request', (payload: ChangeColorPayload) => {
    // TODO : Add error handling if there is a problem and must check if color is taken or not
    const { player } = payload;
    console.log(
      '🚀 ~ file: changeColorListener.ts ~ line 16 ~ socket.on ~ player',
      player
    );
    const { roomName } = helper.extractRoomsSet(socket.rooms);
    const game = gamesServices.findGame(roomName);
    if (game) {
      player.color = payload.color;
      game.updatePlayer(player);
      console.log(
        '🚀 ~ file: changeColorListener.ts ~ line 21 ~ socket.on ~ game',
        game
      );
    }
    socket.emit('change_color/response', player);
  });
};
