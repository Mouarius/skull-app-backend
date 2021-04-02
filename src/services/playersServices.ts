/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Player, { INewPlayer, PlayerUnsensitive } from '../interfaces/Player';
import playersData from '../../data/players.json';
import testData from '../../data/testData.json';

import { nanoid } from 'nanoid';
import EventEmitter from 'events';

let players: Player[] = playersData;

const toUnsensitivePlayer = (player: Player): PlayerUnsensitive => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { socket, ...unsensitivePlayer } = player;
  return unsensitivePlayer;
};

const toUnsensitivePlayers = (players: Player[]) => {
  return players.map((p) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { socket, ...unsensitivePlayer } = p;
    return unsensitivePlayer;
  });
};

export const databaseChange = new EventEmitter();

const resetTestPlayers = () => {
  players = players.filter((p) => p.id.match(/test./g));
  initializeTestPlayers();
};

const initializeTestPlayers = () => {
  players = players.concat(testData.testPlayers);
};

const getAllPlayers = (): PlayerUnsensitive[] => {
  return toUnsensitivePlayers(players);
};

const findPlayer = (id: string): Player => {
  const player = players.find((p) => p.id === id);
  if (!player) {
    throw new Error('Unable to find a player with that id : ' + id);
  }
  return player;
};
const findPlayerWithSocket = (socket_id: string): Player => {
  const player = players.find((p) => p.socket === socket_id);
  console.dir(players);
  if (!player) {
    throw new Error(
      'Unable to find a player with that socket_id : ' + socket_id
    );
  }
  return player;
};
const addPlayer = (object: INewPlayer): PlayerUnsensitive => {
  const newPlayer: Player = { ...object, id: nanoid(), isReady: false };
  players.push(newPlayer);
  return toUnsensitivePlayer(newPlayer);
};
const deletePlayer = (id: string) => {
  players = players.filter((p) => p.id !== id);
};

export default {
  getAllPlayers,
  findPlayer,
  addPlayer,
  findPlayerWithSocket,
  deletePlayer,
  initializeTestPlayers,
  resetTestPlayers,
};
