import { Server, Socket } from 'socket.io';

export default (io: Server): Server => {
  io.on('connection', (socket: Socket) => {
    socket.on('join_game/request', (payload) => {
      const gameInList = helper.findGame(gamesList, payload.gameID);
      if (gameInList) {
        console.log(
          `JOIN GAME : The player ${payload.player.username} has joined the game ${gameInList.gameID}`
        );
        gameInList.players.push(payload.player);
        gamesList = helper.updateGame(gamesList, gameInList);
        const roomName = `room/${gameInList.gameID}`;
        socket.join(roomName);
        socket.to(roomName).emit('player_joined', { player: payload.player });
      }
      io.emit('join_game/status', {
        game: gameInList,
      });
    });

    socket.on('create_game/request', (payload) => {
      // Recieves the player object in payload
      const newGame = new Game(payload.player);
      console.log('newGame', newGame);
      gamesList.push(newGame);
      const roomName = `room/${newGame.gameID}`;
      socket.join(roomName);
      console.log(
        `CREATE GAME : The user ${payload.player.username} has created the game : ${newGame.gameID}`
      );
      console.log('newGame', newGame);

      socket.emit('create_game/status', { status: true, game: newGame });
    });

    socket.on('lobby/update_player_color/request', () => {});

    socket.on('update_game', (payload) => {
      const roomName = `room/${payload.game.gameID}`;
      gamesList = helper.updateGame(gamesList, payload.game);
      socket.to(roomName).emit('game_updated', { game: payload.game });
    });
  });
  return io;
};
