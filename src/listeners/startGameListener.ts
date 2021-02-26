import { Server, Socket } from 'socket.io';
import Deck from '../model/Deck';
import gamesServices from '../services/gamesServices';

export default (io: Server, socket: Socket): void => {
  socket.on('lobby/start_game/request', (gameID: string) => {
    const game = gamesServices.findGame(gameID);
    //TODO : Generate the deck for all players
    game?.players.forEach((p) => {
      if (p.color) {
        p.deck = new Deck(p.color);
      }
    });
    console.log(game?.players);
    io.to(gameID).emit('lobby/start_game/response', game);
  });
};
