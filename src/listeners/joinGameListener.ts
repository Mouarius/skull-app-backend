import { Socket, Server } from 'socket.io';
import Player from '../model/Player';
import gamesServices from '../services/gamesServices';

interface JoinGamePayload {
  player: Player;
  gameID: string;
}

export default (io: Server, socket: Socket): void => {
  socket.on(
    'login/join_game/request',
    ({ player, gameID }: JoinGamePayload) => {
      const gameInList = gamesServices.findGame(gameID);
      if (gameInList) {
        console.log(
          `JOIN GAME : The player ${player.username} has joined the game ${gameInList.gameID}`
        );

        gameInList.addPlayer(player);
        gamesServices.updateGame(gameInList);

        const roomName = gameInList.gameID;

        void socket.join(roomName);

        socket.to(roomName).emit('lobby/player_joined', player);
      }
      io.emit('login/join_game/response', gameInList);
    }
  );
};
