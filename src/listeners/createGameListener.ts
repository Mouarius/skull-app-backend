import { Server, Socket } from 'socket.io';
import gamesServices from '../services/gamesServices';
import { toPlayer } from '../services/playerServices';
import logger from '../util/logger';

export default (_io: Server, socket: Socket): void => {
  socket.on('login/create_game/request', (playerObject: any) => {
    try {
      const player = toPlayer(playerObject);
      const newGame = gamesServices.addGame(player);
      console.log(
        '🚀 ~ file: createGameListener.ts ~ line 9 ~ socket.on ~ newGame',
        newGame
      );
      const roomName = newGame.gameID;
      void socket.join(roomName);

      logger.info(`A new game has been created by ${player.username}`);

      socket.emit('login/create_game/response', newGame);
    } catch (e) {
      console.log(e);
    }
  });
};
