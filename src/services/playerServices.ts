/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { isBoolean, isString } from 'lodash';
import Player from '../model/Player';
import { TeamColor } from '../util/types';

const parseUsername = (username: any): string => {
  if (!username || !isString(username)) {
    throw new Error('Invalid or missing username.');
  }
  return username;
};

const isColor = (param: any): param is TeamColor => {
  return Object.values(TeamColor).includes(param);
};

const parseColor = (color: any): TeamColor | null => {
  if (isColor(color)) {
    return color;
  } else if (color === null) {
    return null;
  }
  throw new Error('Invalid or missing color.');
};

const parseCondition = (cond: any): boolean => {
  if (!isBoolean(cond)) {
    throw new Error('Invalid or missing condition');
  }
  return cond;
};

const parseID = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error('Invalid or missing id');
  }
  return id;
};

// TODO Validate the object and parse each field

export const toPlayer = (object: any): Player => {
  const playerObject = {
    username: parseUsername(object.username),
    color: parseColor(object.color),
    id: parseID(object.id),
    isReady: parseCondition(object.isReady),
    hasWonOneRound: parseCondition(object.hasWonOneRound),
    hasWonTheGame: parseCondition(object.hasWonTheGame),
  };
  const player = Object.assign(new Player(), playerObject) as Player;
  return player;
};
