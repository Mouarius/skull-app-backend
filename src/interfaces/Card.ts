import { CardType, TeamColor } from '../util/types';

export default class Card {
  id: string;
  color: TeamColor;
  type: CardType;
  isInGame = false;
  isVisible = false;
  constructor(color: TeamColor, type: CardType, id: number) {
    this.color = color;
    this.type = type;
    this.id = `${color}_${type}_${id}`;
  }

  play(): void {
    this.isInGame = true;
  }

  show(): void {
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
  }
}
