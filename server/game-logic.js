const resolveMove = require('../client/src/attributes/moves.js');

const equipment = require('../client/src/attributes/equipment.json');
const moves = require('../client/src/attributes/moves.json');
const starters = require('../client/src/attributes/starters.json');
const enemies = require('../client/src/attributes/enemies.json');

const allGames = {} // maps ids to gameStates
const unpaired = [] // list of ids of games missing opponents (expected length 0 or 1)

const getGame = (id) => {
  return allGames[id];
}

const getStarterData = (id) => {
  const starter = 1; // TODO: get the player's starter from the database
  return starters[starter];
}

const addPlayer = (id) => {
  // if already in game (but was disconnected), do nothing.
  // else, join open lobby.
  // else, create new lobby.
  // Returns list of ids in lobby.
  if (allGames[id]) return;
  const opponent = unpaired.pop();
  allGames[id] = {
    id: id,
    opponent: opponent,
    floor: null,
    screen: null,
    selectionData: null,
    lootData: null,
    battleData: null,
    generalStats: { ...getStarterData(id) },
  }
  if (opponent) {
    allGames[opponent].opponent = id; // the opponent's opponent is me
    return [opponent, id];
  }
  return [id];
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
  allGames[id].screen = "battle";
  prepareBattle(id, i);
  prepareLoot(id, i);
}

const loot = (id, discards) => {
  // confirms that the user has clicked past the loot screen.
  // ignores discards for now; should eventually remove discards from generalData.
  allGames[id].screen = "select";
  allGames[id].floor++;
  addLootToStats(id);
  prepareSelect(id);
}

const checkForDeaths = (id) => {
  const opponent = allGames[id].opponent;
  return allGames[id].battleData[id].health <= 0 || allGames[id].battleData[opponent].health <= 0;
}

const move = (id, moveId) => {
  const battleData = allGames[id].battleData;
  if (battleData.turn !== id) return;
  const oppId = allGames[id].opponent;
  const player = battleData[id];
  const enemy = battleData[oppId];
  const [newPlayer, newEnemy] = resolveMove(player, enemy, moveId);
  battleData[id] = newPlayer;
  battleData[oppId] = newEnemy;
  battleData.animating = true;
}

const makeBotMove = (id) => {
  const moveId = allGames[id].battleData.BOT.moves[0]; // always choose first move for now
  move("BOT", moveId);
}

const progressBattle = (id) => {
  const battleData = allGames[id].battleData;
  const opponent = battleData.BOT ? "BOT" : allGames[id].opponent;
  // check for deaths
}

module.exports = {
  getGame,
  addPlayer,
  checkForDeaths,
  startGame,
  move,
  select,
  loot,
}