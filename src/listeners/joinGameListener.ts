import { Socket, Server } from 'socket.io';
import gamesServices from '../services/gamesServices';
import { toPlayer } from '../services/playerServices';
import logger from '../util/logger';

interface JoinGamePayload {
  playerObject: any;
  gameID: string;
}

export default (io: Server, socket: Socket): void => {
  socket.on(
    'login/join_game/request',
    ({ playerObject, gameID }: JoinGamePayload) => {
      try {
        console.log(
          '🚀 ~ file: joinGameListener.ts ~ line 15 ~ playerObject',
          playerObject
        );

        const player = toPlayer(playerObject); // Convert to Player type
        const gameInList = gamesServices.findGame(gameID);

        if (gameInList) {
          //** Add the test endpoint */
          if (gameID === 'test') {
            logger.info('Entering the test game');
            gamesServices.resetTestGame();
            gameInList.setOwner(player);
          }
          logger.info(
            `The player ${player.username} has joined the game with ID : ${gameID}`
          );

          gameInList.addPlayer(player);
          gamesServices.updateGame(gameInList);
          const roomName = gameInList.gameID;
          void socket.join(roomName);

          socket.to(roomName).emit('lobby/player_joined', player);
        }
        io.emit('login/join_game/response', gameInList);
        console.log(gamesServices.getGames());
      } catch (e) {
        console.log(e);
      }
    }
  );
};
