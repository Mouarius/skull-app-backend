import { Server, Socket } from 'socket.io';
import Player from '../interfaces/Player';
import gamesServices from '../services/gamesServices';
import helper from '../util/helper';

export default (io: Server, socket: Socket): void => {
  socket.on('lobby/player_ready', (player: Player) => {
    const { roomName } = helper.extractRoomsSet(socket.rooms);
    const game = gamesServices.findGame(roomName);
    if (game) {
      player.isReady = !player.isReady;
      game.updatePlayer(player);
    }
    io.emit('lobby/player_ready', player);
  });
};
