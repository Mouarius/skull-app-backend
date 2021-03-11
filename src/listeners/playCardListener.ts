import { Server, Socket } from 'socket.io';
import gamesServices from '../services/gamesServices';
import helper from '../util/helper';
import { CardType } from '../util/types';

interface IPayload {
  playerID: string;
  cardType: CardType;
  gameID?: string;
}

export default (io: Server, socket: Socket): void => {
  socket.on('card/play_card', (payload: IPayload) => {
    let gameID = payload.gameID;
    if (!gameID) {
      const { roomName } = helper.extractRoomsSet(socket.rooms);
      gameID = roomName;
    }

    const game = gamesServices.findGame(gameID);

    if (game) {
      const player = game.players.find((p) => p.id === payload.playerID);

      if (player) {
        const cardsLeft = player.deck?.cards?.filter(
          (c) => c.isInGame === false && c.type === payload.cardType
        );
        if (cardsLeft && cardsLeft.length > 0) {
          console.log(cardsLeft);
          console.log(cardsLeft[0]);
          cardsLeft[0].isInGame = true;
          io.to(gameID).emit('card/card_played', cardsLeft[0]);
        }
      }
    }
  });
};
