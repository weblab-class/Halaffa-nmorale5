const resolveMove = require('../client/src/attributes/moves.js');

const equipment = require('../client/src/attributes/equipment.json');
const moves = require('../client/src/attributes/moves.json');
const starters = require('../client/src/attributes/starters.json');
const enemies = require('../client/src/attributes/enemies.json');

const gameState = {
  players: [],
  turn: null,
}

const getStarterData = (id) => {
  const starter = 1; // TODO: get the player's starter from the database
  return starters[starter];
}

const addPlayer = (id) => {
  if (gameState.players.length < 2) {
    const starter = getStarterData(id);
    gameState.players.push({ ...starter, id });
    console.log(`Added player with ID ${id} and starter ${starter.name}`);
  } else {
    console.log(`Failed to add player since 2 people already in game`);
  }
}

const startBattle = () => {
  gameState.turnData.turn = (gameState.players[0].speed > gameState.players[1].speed ? 0 : 1);
  console.log("Game started");
}

const checkForDeaths = () => {
  return gameState.players[0].health <= 0 || gameState.players[1].health <= 0;
}

const makeMove = (playerId, moveId) => {
  if (gameState.players[gameState.turn].id !== playerId) return;
  const i = gameState.turn;
  const player = gameState.players[i];
  const enemy = gameState.players[i ^ 1];
  const [newPlayer, newEnemy] = resolveMove(player, enemy, moveId);
  gameState.players[i] = newPlayer;
  gameState.players[i ^ 1] = newEnemy;
  if (checkForDeaths()) {
    gameState.turn = null; // game is now over
  } else {
    gameState.turn = i ^ 1; // switch to opponent's turn
  }
}

module.exports = {
  gameState,
  addPlayer,
  startBattle,
  checkForDeaths,
  makeMove,
}