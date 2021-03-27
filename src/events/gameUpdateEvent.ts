import { Server, Socket } from 'socket.io';
import { Game } from '../interfaces/Game';
import gamesServices from '../services/gamesServices';

export default (io: Server, socket: Socket, game: Game) => {
  io.in(game.id).emit('GAME_UPDATE', gamesServices.populate(game));
};
