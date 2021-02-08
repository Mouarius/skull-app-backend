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

const playersList = []

let gamesList = []

app.use(cors())

app.get('/api/games', (req, res) => {
  res.status(200).json(gamesList)
})

app.get(`/api/games/:gameID`, (req, res) => {
  // Must check when a user accesses a game with the url, that the game exists in DB
  const { gameID } = req.params
  // verify if the Game id is in the gamesList array
  const gameInList = helper.findGame(gamesList, gameID)
  if (gameInList) {
    res.status(200).json(gameInList)
  } else {
    res.status(404).json({ error: 'The game you requested does not exist.' })
  }
})

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
    const newGameID = uuidv4()
    const newGame = {
      gameID: newGameID,
      ownerID: payload.player.id,
      players: [payload.player],
    }
    console.log('newGame :>> ', newGame)
    gamesList.push(newGame)
    const roomName = `room/${newGame.gameID}`
    socket.join(roomName)
    console.log(
      `CREATE GAME : The user ${payload.player.username} has created the game : ${newGame.gameID}`
    )
    socket.emit('create_game/status', { status: true, game: newGame })
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
