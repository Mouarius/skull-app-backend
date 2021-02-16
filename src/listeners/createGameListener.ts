import { Server, Socket } from 'socket.io';
import Player from '../model/Player';
import gamesServices from '../services/gamesServices';
import logger from '../util/logger';

export default (_io: Server, socket: Socket): void => {
  socket.on('login/create_game/request', (player: Player) => {
    const newGame = gamesServices.addGame(player);
    const roomName = newGame.gameID;
    void socket.join(roomName);

    logger.createGameLog(newGame);

    socket.emit('login/create_game/response', newGame);
  });
};
