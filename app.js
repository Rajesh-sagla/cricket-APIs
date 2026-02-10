const express = require('express')
const path = require('path')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
let db = null
app.use(express.json())
const dbpath = path.join(__dirname, 'cricketTeam.db')
let initializeDbAAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Sever Running...')
    })
  } catch (e) {
    console.log(`error at : ${e.message}`)
  }
}
initializeDbAAndServer()
//API1
app.get('/players/', async (request, response) => {
  let getallplayerquery = `SELECT player_id as playerId,player_name as playerName,jersey_number as jerseyNumber,role from cricket_team;`
  let getallplayers = await db.all(getallplayerquery)
  response.send(getallplayers)
})
module.exports = app
//API2
app.post('/players/', async (request, response) => {
  let cricketDetails = request.body
  let {playerName, jerseyNumber, role} = cricketDetails
  let addPlayerQuery = `INSERT INTO cricket_Team (player_name,jersey_number,role) VALUES ($playerName,$jerseyNumber,$role);`
  let dbResponse = await db.run(addPlayerQuery)
  response.send('Player Added to Team')
})
//API3
app.get('/players/:playerId/', async (request, response) => {
  let {playerId} = request.params
  let getPlayerQuery = `SELECT player_id as playerId,player_name as playerName,jersey_number as jerseyNumber,role FROM cricket_Team where player_id=${playerId};`
  let getPlayer = await db.get(getPlayerQuery)
  response.send(getPlayer)
})
//API4
app.put('/players/:playerId/', async (request, response) => {
  let {playerId} = request.params
  let playerDetails = request.body
  let {playerName, jerseyNumber, role} = playerDetails
  let updatePlayerQuery = `UPDATE cricket_Team set player_name=${playerName},jersey_number=${jerseyNumber},role=${role} where player_id=${playerId};`
  await db.run(updatePlayerQuery)
  response.send('Player Details Update')
})
