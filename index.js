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

const gamesList = []

app.use(cors())

app.get('/api/games', (req, res) => {
  res.status(200).json(gamesList)
})

io.on('connection', (socket) => {
  console.log(`A user has connected with id : ${socket.id}`)

  socket.on('player login', (payload) => {
    console.log(
      `A new user logged in with username : ${payload.player.username}`
    )
    io.emit('player login status', payload)
  })

  // TODO : Change request name to request
  socket.on('join game', (payload) => {
    const gameInList = _.find(
      gamesList,
      _.matchesProperty('gameID', payload.gameID)
    )
    const gameExists = !!gameInList
    console.log('gameExists :>> ', gameExists)
    console.log('gameFound :>> ', gameInList)
    io.emit('join game status', { status: gameExists, game: gameInList })
  })

  socket.on('create game', (payload) => {
    const newGameID = uuidv4()
    const newGame = { gameID: newGameID, ownerID: payload.player.id }
    gamesList.push(newGame)
    console.log('gamesList :>> ', gamesList)
    socket.emit('create game status', newGame)
  })
})

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
