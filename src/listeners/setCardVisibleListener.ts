import { Socket, Server } from 'socket.io';
import Card from '../model/Card';
import gamesServices from '../services/gamesServices';
import helper from '../util/helper';

export default (_io: Server, socket: Socket): void => {
  socket.on(
    'board/set_card_visible/request',
    (playerID: string, card: Card) => {
      console.log(
        '🚀 ~ file: setCardVisibleListener.ts ~ line 9 ~ socket.on ~ player',
        playerID
      );
      console.log(
        '🚀 ~ file: setCardVisibleListener.ts ~ line 9 ~ socket.on ~ card',
        card
      );

      console.log(`The card ${card.id} is requested to be visible !`);
      //modify the game
      const { roomName } = helper.extractRoomsSet(socket.rooms);
      const game = gamesServices.findGame(roomName);

      if (game) {
        const playerInDB = game.players.find((p) => p.id === playerID);
        const cardToChange = playerInDB?.deck?.cards?.find(
          (c) => c.id === card.id
        );
        if (cardToChange) {
          cardToChange.isVisible = true;
          // !!!! Change this
        }
      }
    }
  );
};
