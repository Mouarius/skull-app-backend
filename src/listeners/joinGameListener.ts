import { Socket, Server } from 'socket.io';
import gamesServices from '../services/gamesServices';
import { Player } from '../util/types';

export default (io: Server, socket: Socket): void => {
  socket.on('join_game/request', (gameID: string, player: Player) => {
    const gameInList = gamesServices.findGame(gameID);
    if (gameInList) {
      console.log(
        `JOIN GAME : The player ${player.username} has joined the game ${gameInList.gameID}`
      );

      gameInList.addPlayer(player);
      gamesServices.updateGame(gameInList);

      const roomName = `room/${gameInList.gameID}`;

      void socket.join(roomName);

      socket.to(roomName).emit('player_joined', player);
    }
    io.emit('join_game/response', gameInList);
  });
};
