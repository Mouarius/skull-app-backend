import Card from './Card';
import { CardType, TeamColor } from '../util/types';

export default class Deck {
  cards: Card[];
  color: TeamColor;

  constructor(color: TeamColor) {
    this.color = color;
    if (Object.values(TeamColor).includes(color)) {
      this.cards = this.createDeck();
    } else {
      this.cards = [];
    }
  }

  createDeck(): Card[] {
    const emptyDeck = [];

    // Initialize Skull
    const newSkull = new Card(this.color, CardType.SKULL, 0);
    emptyDeck.push(newSkull);

    // Initialize Flowers
    for (let i = 0; i < 3; i++) {
      const newFlower = new Card(this.color, CardType.FLOWER, i + 1);
      emptyDeck.push(newFlower);
    }
    return emptyDeck;
  }
}
