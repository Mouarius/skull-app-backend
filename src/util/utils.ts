/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { isBoolean } from 'lodash';
import Card from '../interfaces/Card';
import Game, { INewGame } from '../interfaces/game';
import Player, { INewPlayer } from '../interfaces/Player';
import { TeamColor } from './types';

const isString = (arg: any): arg is string => {
  return typeof arg === 'string' || arg instanceof String;
};

const isColor = (arg: any): arg is TeamColor => {
  return Object.values(TeamColor).includes(arg);
};

const isCards = (arg: any): arg is Card[] => {
  return arg[0] instanceof Card;
};

const parseUsername = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name : ' + name);
  }
  return name;
};

const parseID = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing id : ' + id);
  }
  return id;
};
const parseIDS = (ids: any): string[] => {
  if (!ids || !Array.isArray(ids) || !isString(ids[0])) {
    throw new Error('Incorrect or missing ids : ' + ids);
  }
  return ids as string[];
};

const parseColor = (color: any): TeamColor => {
  if (!color || !isColor(color)) {
    throw new Error('Incorrect or missing color : ' + color);
  }
  return color;
};

const parseBoolean = (condition: any): boolean => {
  if (!isBoolean(condition)) {
    throw new Error('Incorrect or missing condition : ' + condition);
  }
  return condition;
};

const parseDeck = (deck: any): Card[] => {
  if (!deck || !isCards(deck)) {
    throw new Error('Incorrect or missing deck : ' + deck);
  }
  return deck;
};

const parseRoundsWon = (roundsWon: any): 0 | 1 | 2 => {
  if (roundsWon === 0 || roundsWon === 1 || roundsWon === 2) {
    return roundsWon as 0 | 1 | 2;
  } else {
    throw new Error('Incorrect or missing roundsWon : ' + roundsWon);
  }
};

export const toNewPlayer = (object: any): INewPlayer => {
  return { username: parseUsername(object.username) };
};

export const toPlayer = (object: any): Player => {
  return {
    id: parseID(object.id),
    username: parseUsername(object.username),
    color: parseColor(object.color),
    deck: parseDeck(object.deck),
    isReady: parseBoolean(object.isReady),
    isPlaying: parseBoolean(object.isPlaying),
    roundsWon: parseRoundsWon(object.roundsWon),
    game_id: parseID(object.game_id),
  };
};

export const toNewGame = (object: any): INewGame => {
  return {
    owner_id: parseID(object.owner_id),
    players_id: parseIDS(object.players),
  };
};

export const toGame = (object: any): Game => {
  return {
    id: parseID(object.id),
    owner_id: parseID(object.owner_id),
    players_id: parseIDS(object.players),
  };
};

export const toOwnerID = (object: any): string => {
  return parseID(object.owner_id);
};
