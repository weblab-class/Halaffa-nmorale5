const resolveMove = require('../client/src/attributes/moves.js');

const equipment = require('../client/src/attributes/equipment.json');
const moves = require('../client/src/attributes/moves.json');
const starters = require('../client/src/attributes/starters.json');
const enemies = require('../client/src/attributes/enemies.json');

const allGames = {}; // maps ids to gameStates
const unpaired = {
  classic: [],
  draft: [],
}; // maps game modes to ids of unpaired players

const getGame = (id) => {
  return allGames[id];
}

const getStarterData = (id) => {
  const starter = 1; // TODO: get the player's starter from the database
  return starters[starter];
}

const addPlayer = (id, mode) => {
  // if already in game (but was disconnected), do nothing.
  // else, join open lobby.
  // else, create new lobby.
  // Returns list of ids in lobby.
  if (allGames[id]) return null;
  const opponent = mode == "endless" ? "BOT" : unpaired[mode].pop();
  allGames[id] = {
    id: id,
    opponent: opponent,
    gameMode: mode,
    floor: null,
    screen: null,
    selectionData: null,
    lootData: null,
    battleData: null,
    generalStats: { ...getStarterData(id) },
  }
  if (opponent == "BOT") {
    return [id];
  }
  if (opponent) {
    allGames[opponent].opponent = id; // the opponent's opponent is me
    return [opponent, id];
  }
  unpaired[mode].push(id);
  return null;
}

const removePlayer = (id) => {
  delete allGames[id];
}

const prepareSelect = (id) => {
  allGames[id].selectionData = [0, 1, 2].map(eqId => equipment[eqId]);
}

const prepareBattle = (id, selection) => {
  allGames[id].battleData = {
    [id]: { ...allGames[id].generalStats },
    BOT: { ...enemies[selection] },
    turn: id,
    lastMove: null,
    animating: false,
  }
}

const prepareLoot = (id, selection) => {
  allGames[id].lootData = allGames[id].selectionData[selection];
}

const addLootToStats = (id) => {
  const stats = allGames[id].generalStats;
  const loot = allGames[id].lootData;
  allGames[id].generalStats = {
    ...stats,
    red: stats.red + loot.red,
    green: stats.green + loot.green,
    blue: stats.blue + loot.blue,
    equipment: stats.equipment.concat([loot.id])
  }
}

const startGame = (id) => {
  // sets up game for one of the players only
  // expects startGame to be called twice: once on behalf of each player
  allGames[id].screen = "select";
  allGames[id].floor = 1;
  prepareSelect(id);
}

const select = (id, i) => {
  // chooses the i-th index of selectionData to be the prize at stake for the next battle
  if (allGames[id].gameMode != "draft") {
    allGames[id].screen = "battle";
    prepareBattle(id, i);
    prepareLoot(id, i);
  } else {
    prepareLoot(id, i);
    addLootToStats(id);
    prepareSelect(id);
    allGames[id].floor++;
    if (allGames[id].floor > 5) allGames[id].screen = "waiting";
  }
}

const loot = (id, discards) => {
  // confirms that the user has clicked past the loot screen.
  // ignores discards for now; should eventually remove discards from generalData.
  allGames[id].screen = "select";
  allGames[id].floor++;
  addLootToStats(id);
  prepareSelect(id);
}

const move = (gameId, playerId, moveId) => {
  // makes a move by playerId, on the game given by gameId
  const battleData = allGames[gameId].battleData;
  const player = battleData[playerId];
  const enemyId = gameId == playerId ?
    (battleData.BOT ? "BOT" : allGames[gameId].opponent) : gameId;
  const enemy = battleData[enemyId];
  const [newPlayer, newEnemy] = resolveMove(player, enemy, moveId);
  battleData[playerId] = newPlayer;
  battleData[enemyId] = newEnemy;
  battleData.lastMove = moveId;
  battleData.animating = true;
}

const makeBotMove = (id) => {
  console.log(allGames[id].battleData)
  const moveId = allGames[id].battleData.BOT.moves[0]; // always choose first move for now
  move(id, "BOT", moveId);
}

const progressBattle = (id) => {
  const battleData = allGames[id].battleData;
  const opponent = battleData.BOT ? "BOT" : allGames[id].opponent;
  // check for deaths
  if (battleData[id].health <= 0) {
    if (allGames[id].gameMode == "endless") {
      allGames[id].screen = "end";
    } else if (opponent == "BOT") {
      allGames[id].screen = "select";
    } else {
      allGames[id].screen = "lose";
    }
    return true;
  }
  if (battleData[opponent].health <= 0) {
    if (opponent == "BOT") {
      allGames[id].screen = "loot";
    } else {
      allGames[id].screen = "win";
    }
    return true;
  }
  // stop animating and change player's turn
  battleData.animating = false;
  if (battleData.turn == id) battleData.turn = opponent;
  else battleData.turn = id;
  // if it's the bot's turn next, make move for them
  if (battleData.turn == "BOT") makeBotMove(id);
  return false;
}

const startFinalBattle = (player) => {
  const opponent = allGames[player].opponent;
  allGames[player].gameMode = "final";
  allGames[player].screen = "battle";
  const playerStats = allGames[player].generalStats;
  const opponentStats = allGames[opponent].generalStats;
  let turn;
  if (playerStats.speed > opponentStats.speed) turn = player;
  else if (playerStats.speed < opponentStats.speed) turn = opponent;
  else turn = (player > opponent) ? player : opponent; // arbitrarily break ties by id
  allGames[player].battleData = {
    [player]: { ...playerStats },
    [opponent]: { ...opponentStats },
    turn: turn,
    lastMove: null,
    animating: false,
  };
}

module.exports = {
  allGames,
  getGame,
  addPlayer,
  removePlayer,
  startGame,
  select,
  loot,
  move,
  progressBattle,
  startFinalBattle,
}