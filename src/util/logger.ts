import Game from '../model/Game';

const createGameLog = (game: Game) => {
  console.log(`CREATE GAME : The game ${game.gameID} has been created !`);
};

export default { createGameLog };
