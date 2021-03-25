/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Player, { INewPlayer } from '../interfaces/Player';
import playersData from '../../data/players.json';
import { nanoid } from 'nanoid';

const players: Player[] = playersData;

const getAllPlayers = (): Player[] => {
  return players;
};

const findPlayer = (id: string): Player => {
  const player = players.find((p) => p.id === id);
  if (!player) {
    throw new Error('Unable to find a player with that id : ' + id);
  }
  return player;
};
const addPlayer = (object: INewPlayer): Player => {
  const newPlayer: Player = { ...object, id: nanoid(), isReady: false };
  players.push(newPlayer);
  return newPlayer;
};

export default { getAllPlayers, findPlayer, addPlayer };
