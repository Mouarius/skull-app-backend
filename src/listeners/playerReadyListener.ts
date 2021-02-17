import { Server, Socket } from 'socket.io';
import Player from '../model/Player';
import gamesServices from '../services/gamesServices';
import helper from '../util/helper';

export default (io: Server, socket: Socket): void => {
  socket.on('lobby/player_ready', (player: Player) => {
    const { roomName } = helper.extractRoomsSet(socket.rooms);
    console.log(
      '🚀 ~ file: playerReadyListener.ts ~ line 9 ~ socket.on ~ roomName',
      roomName
    );
    const game = gamesServices.findGame(roomName);
    if (game) {
      player.isReady = !player.isReady;
      console.log(
        '🚀 ~ file: playerReadyListener.ts ~ line 16 ~ socket.on ~ player',
        player
      );
      game.updatePlayer(player);
      console.log(
        '🚀 ~ file: playerReadyListener.ts ~ line 21 ~ socket.on ~ game',
        game
      );
    }
    io.emit('lobby/player_ready', player);
  });
};
