const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
let app = express()
app.use(express.json())
const dbpath = path.join(__dirname, 'cricketTeam.db')
let db = null
let initalDBAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000)
    console.log('Sever Running')
  } catch (e) {
    console.log(`error at : ${e}`)
    process.exit()
  }
}
initalDBAndServer()
//get player
app.get('/players/', async (requset, response) => {
  let getallplayesquery = `   SELECT 
     player_id AS playerId,
     player_name AS playerName,
     jersey_number AS jerseyNumber,
     role 
    FROM cricket_team;`
  let allplayers = await db.all(getallplayesquery)
  response.send(allplayers)
})
//post player
app.post('/players/', async (request, response) => {
  let playerDetails = request.body
  let playerDetail = {
    playerName: 'Vishal',
    jerseyNumber: 17,
    role: 'Bowler',
  }
  let {playerName, jerseyNumber, role} = playerDetail
  let playeraddquery = `INSERT INTO cricket_team (player_id,player_name,jersy_number,role) VALUES (${playerName},${jerseyNumber},${role});`
  let updateplayer = await db.get(playeraddquery)
  response.send('Player Added to Team')
})
