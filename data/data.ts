import Game from '../src/model/Game';
import Player from '../src/model/Player';
import { TeamColor } from '../src/util/types';

export const playersList: Player[] = [];

const testPlayer = new Player();
testPlayer.username = 'The Tester';
testPlayer.id = 'tester';
testPlayer.setColor(TeamColor.BLACK);
testPlayer.toggleReady();

const testGame = new Game(testPlayer);
testGame.gameID = 'test';

export const games: Game[] = [testGame];
