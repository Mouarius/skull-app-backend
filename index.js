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
  if (gameInList.exists) {
    res.status(200).json(gameInList)
  } else {
    res.status(404).json({ error: 'The game you requested does not exist.' })
  }
})

io.on('connection', (socket) => {
  socket.on('login_player/request', (payload) => {
    // When a user logs in, broadcast it to the others
    console.log(
      `A new user logged in with username : ${payload.player.username}`
    )
    // Broadcast a new login to the users
    io.emit('login_player/status', { status: true, player: payload })
  })

  socket.on('join_game/request', (payload) => {
    const gameInList = helper.findGame(gamesList, payload.gameID)
    console.log(
      `JOIN GAME : The user ${payload.player.username} wants to join the game ${gameInList.game.gameID}`
    )
    io.emit('join_game/status', {
      status: gameInList.exists,
      game: gameInList.game,
    })
    if (gameInList.exists) {
      console.log(
        `JOIN GAME : The player ${payload.player.username} has joined the game ${gameInList.game.gameID}`
      )

      gameInList.game.players.push(payload.player)
      gamesList = helper.updateGame(gamesList, gameInList.game)
      const roomName = `room/${gameInList.game.gameID}`
      socket.join(roomName)
      socket.to(roomName).emit('player_joined', { player: payload.player })
    }
  })

  socket.on('create_game/request', (payload) => {
    // Recieves the player object in payload
    const newGameID = uuidv4()
    const newGame = {
      gameID: newGameID,
      ownerID: payload.player.id,
      players: [payload.player],
    }
    gamesList.push(newGame)
    const roomName = `room/${newGame.gameID}`
    socket.join(roomName)
    console.log(
      `CREATE GAME : The user ${payload.player.username} has created the game : ${newGame.gameID}`
    )
    socket.emit('create_game/status', { status: true, game: newGame })
  })

  socket.on('color_selected', (payload) => {
    const roomName = `room/${payload.game.gameID}`
    // TODO finish to emit color change event
    console.log('payload :>> ', payload)
    socket.to(roomName).emit('color_selected', {
      color: payload.color,
      playerID: payload.playerID,
    })
  })
})

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
