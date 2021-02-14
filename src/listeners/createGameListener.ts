import { Server, Socket } from 'socket.io';
import gamesServices from '../services/gamesServices';
import logger from '../util/logger';
import { Player } from '../util/types';

export default (_io: Server, socket: Socket): void => {
  socket.on('create_game/request', (player: Player) => {
    const newGame = gamesServices.addGame(player);
    const roomName = `room/${newGame.gameID}`;
    void socket.join(roomName);

    logger.createGameLog(newGame);

    socket.emit('create_game/response', newGame);
  });
};
