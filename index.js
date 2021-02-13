const { v4: uuidv4 } = require('uuid')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')

require('dotenv').config()

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
const _ = require('lodash')
const helper = require('./util/helper')
const { URL } = require('./util/config')
let { gamesList } = require('./data')
const gamesRouter = require('./controller/gamesRouter')
const Game = require('./model/Game')

app.use(cors())
app.use('/api/games', gamesRouter)

io.on('connection', (socket) => {
  socket.on('join_game/request', (payload) => {
    const gameInList = helper.findGame(gamesList, payload.gameID)
    if (gameInList) {
      console.log(
        `JOIN GAME : The player ${payload.player.username} has joined the game ${gameInList.gameID}`
      )
      gameInList.players.push(payload.player)
      gamesList = helper.updateGame(gamesList, gameInList)
      const roomName = `room/${gameInList.gameID}`
      socket.join(roomName)
      socket.to(roomName).emit('player_joined', { player: payload.player })
    }
    io.emit('join_game/status', {
      game: gameInList,
    })
  })

  socket.on('create_game/request', (payload) => {
    // Recieves the player object in payload
    const newGame = new Game(payload.player)
    console.log('newGame', newGame)
    gamesList.push(newGame)
    const roomName = `room/${newGame.gameID}`
    socket.join(roomName)
    console.log(
      `CREATE GAME : The user ${payload.player.username} has created the game : ${newGame.gameID}`
    )
    console.log('newGame', newGame)

    socket.emit('create_game/status', { status: true, game: newGame })
  })

  socket.on('lobby/update_player_color/request', (payload) => {
    const gameToUpdate = helper.findGame
  })

  socket.on('update_game', (payload) => {
    const roomName = `room/${payload.game.gameID}`
    gamesList = helper.updateGame(gamesList, payload.game)
    socket.to(roomName).emit('game_updated', { game: payload.game })
  })
})

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
