import { Socket, Server } from 'socket.io';
import gamesServices from '../services/gamesServices';
import helper from '../util/helper';
import logger from '../util/logger';

interface IPayload {
  playerID: string;
  cardID: string;
}

export default (io: Server, socket: Socket): void => {
  socket.on('card/set_card_visible', ({ cardID, playerID }: IPayload) => {
    console.log(`The card ${cardID} is requested to be visible !`);
    //modify the game
    const { roomName } = helper.extractRoomsSet(socket.rooms);
    const game = gamesServices.findGame(roomName);

    if (game) {
      const playerInDB = game.players.find((p) => p.id === playerID);
      const cardToChange = playerInDB?.deck?.cards?.find(
        (c) => c.id === cardID
      );
      if (playerInDB && cardToChange) {
        cardToChange.isVisible = true;
        logger.info(`The card ${cardID} has been set to visible`);
        io.emit('card/card_visible', {
          playerID: playerInDB.id,
          cardID: cardToChange.id,
        });
      }
    }
  });
};
