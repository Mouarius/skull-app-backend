const { v4: uuidv4 } = require('uuid')

class Game {
  constructor(player) {
    this.players = [player]
    this.gameID = uuidv4()
    this.ownerID = player.id
  }

  get state() {
    return { gameID: this.gameID, ownerID: this.ownerID, players: this.players }
  }

  addPlayer(player) {
    this.players.push(player)
  }

  removePlayer(playerToRemove) {
    this.players.filter((player) => player.id !== playerToRemove.id)
  }
}

module.exports = Game
