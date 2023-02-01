const resolveMove = require('../client/src/attributes/moves.js');
const resolveEquipment = require('../client/src/attributes/equipment.js')

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

const getStarterData = async (id) => {
  const starter = 1; // TODO: get the player's starter from the database
  return { ...starters[starter] };
}

const addPlayer = async (id, mode) => {
  // if already in game (but was disconnected), do nothing.
  // else, join open lobby.
  // else, create new lobby.
  // Returns list of ids in lobby if game is ready to begin
  if (allGames[id]) return null;
  const opponent = mode == "endless" ? "BOT" : unpaired[mode].shift();
  allGames[id] = {
    id: id,
    opponent: opponent,
    gameMode: mode,
    floor: null,
    screen: null,
    selectionData: null,
    lootData: null,
    battleData: null,
    selection: null,
    generalStats: { ...await getStarterData(id) },
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

const cancel = (id) => {
  delete allGames[id];
  if (unpaired.classic.includes(id)) unpaired.classic.shift();
  if (unpaired.draft.includes(id)) unpaired.draft.shift();
}

const prepareSelect = (id) => {
  // const loot = [0, 1, 2].map(eqId => ({ ...equipment[eqId]}));
  // const enemys = [0, 1, 2].map(enemyId => ({ ...enemies[enemyId] }));
  // enemys.forEach((e, i) => e.equipment = [i]);
  const loot = generateLoot(allGames[id].floor);
  const enemys = generateEnemies(allGames[id].floor);
  enemys.forEach((e, i) => e.equipment = loot[i].color ? [loot[i].id] : []);
  allGames[id].selectionData = {
    loot: loot,
    enemies: enemys,
  };
}

const prepareBattle = (id, selection) => {
  allGames[id].battleData = {
    [id]: getStats(allGames[id].generalStats),
    BOT: getStats(allGames[id].selectionData.enemies[selection]),
    turn: id,
    animating: false,
  }
  console.log("BattleData:")
  console.log(allGames[id].battleData)
  console.log(allGames[id].battleData[id])
  applyEquipment(allGames[id].battleData[id], allGames[id].battleData.BOT);
  applyStats(allGames[id].battleData[id], allGames[id].battleData.BOT);
}

const prepareLoot = (id, selection) => {
  allGames[id].lootData = allGames[id].selectionData.loot[selection];
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
    allGames[id].selection = i;
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

const loot = (id, discard) => {
  // confirms that the user has clicked past the loot screen.
  // removes the move at index given by discard (if any)
  allGames[id].screen = "select";
  allGames[id].floor++;
  if (discard || discard === 0) {
    allGames[id].generalStats.moves.splice(discard, 1);
  }
  addLootToStats(id);
  prepareSelect(id);
}

const move = (gameId, playerId, moveIdx) => {
  // makes a move by playerId, on the game given by gameId
  const battleData = allGames[gameId].battleData;
  const player = battleData[playerId];
  const enemyId = gameId == playerId ?
    (battleData.BOT ? "BOT" : allGames[gameId].opponent) : gameId;
  const enemy = battleData[enemyId];
  const resultText = executeMove(player, enemy, moveIdx);
  battleData.text = resultText;
  battleData.animating = true;
  resetBuffs(gameId);
  console.log("HERE")
  console.log(playerId)
  console.log(battleData[playerId])
  applyEquipment(battleData[playerId], battleData[enemyId]);
  applyStats(battleData[playerId], battleData[enemyId]);
}

const makeBotMove = (id) => {
  console.log(allGames[id].battleData)
  const moveIdx = 0; // always choose first move for now
  move(id, "BOT", moveIdx);
}

const progressBattle = (id) => {
  const battleData = allGames[id].battleData;
  const opponent = battleData.BOT ? "BOT" : allGames[id].opponent;
  // check for deaths
  if (battleData[id].health <= 0) {
    if (allGames[id].gameMode == "endless") {
      allGames[id].screen = "end";
    } else if (opponent == "BOT") {
      prepareSelect(id);
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
  const playerStats = getStats(allGames[player].generalStats);
  const opponentStats = getStats(allGames[opponent].generalStats);
  let turn;
  if (playerStats.speed > opponentStats.speed) turn = player;
  else if (playerStats.speed < opponentStats.speed) turn = opponent;
  else turn = (player > opponent) ? player : opponent; // arbitrarily break ties by id
  allGames[player].battleData = {
    [player]: playerStats,
    [opponent]: opponentStats,
    turn: turn,
    animating: false,
  };
  applyEquipment(playerStats, opponentStats);
  applyStats(playerStats, opponentStats);
}

// HELPERS

// takes array of equipment ids and returns array of all equipment data
const getEquipment = (ids) => ids.map((eqId) => {
  const eq = { ...equipment.find(({id}) => id === eqId) };
  return eq;
})

// takes array of move ids and returns array of all move data
const getMoves = (ids) => ids.map((moveId) => {
  const move = { ...moves.find(({id}) => id === moveId) };
  move.callbacks = [];
  return move;
})

// takes generalStats or selectionData.enemies[i] and returns copy with eq and move ids replaced with the real data
const getStats = (stats) => {
  const out = {
    ...stats,
    maxhealth: stats.health,
    moves: getMoves(stats.moves),
    equipment: getEquipment(stats.equipment),
  }
  return out
}

// MOVE CALCULATIONS

// reset stats at the start of each turn, before reapplying equipment and stats
const resetBuffs = (id) => {
  const playerOrig = allGames[id].generalStats;
  const enemyId = allGames[id].battleData.BOT ? "BOT" : allGames[id].opponent;
  const enemyOrig = enemyId == "BOT" ?
    allGames[id].selectionData.enemies[allGames[id].selection] :
    allGames[enemyId].generalStats;
  // refresh all base stats and moves, but keep health and equipment counters untouched
  allGames[id].battleData[id] = { 
    ...playerOrig,
    health: allGames[id].battleData[id].health,
    maxhealth: allGames[id].battleData[id].maxhealth,
    moves: getMoves(playerOrig.moves),
    equipment: allGames[id].battleData[id].equipment,
  };
  allGames[id].battleData[enemyId] = {
    ...enemyOrig,
    health: allGames[id].battleData[enemyId].health,
    maxhealth: allGames[id].battleData[enemyId].maxhealth,
    moves: getMoves(enemyOrig.moves),
    equipment: allGames[id].battleData[enemyId].equipment,
  };
}

// applies all effects from both players' equipment
const applyEquipment = (player, enemy) => {
  player.equipment = player.equipment.filter(eq => !resolveEquipment(eq, player, enemy));
  enemy.equipment = enemy.equipment.filter(eq => !resolveEquipment(eq, enemy, player));
}

// applies both player's stats to adjust all moves' power and accuracy
const applyStats = (player, enemy) => {
  // TODO: make some formula for calculating power and accuracy of each move, 
  // based on attack/elements and speed-to-enemy-speed ratio
  player.moves.forEach((move) => {
    move.power = move.power * Math.sqrt(player.attack + 2 * player[move.color]);
    move.accuracy = (1 - (1 - move.accuracy/100)**Math.sqrt(player.speed/enemy.speed)) * 100;
  });
  enemy.moves.forEach((move) => {
    move.power = move.power * Math.sqrt(enemy.attack + 2 * enemy[move.color]);
    move.accuracy = (1 - (1 - move.accuracy/100)**Math.sqrt(enemy.speed/player.speed)) * 100;
  });
}

// makes the move, taking into account all buffs, then calls all equipment callbacks
const executeMove = (player, enemy, idx) => {
  const move = player.moves[idx];
  // moveSummary contains difference in player health, enemy health, and battle text as a result of move
  const moveSummary = resolveMove(move, player, enemy);
  move.callbacks.forEach((cb) => cb(moveSummary));
  return moveSummary.text;
}

// LOOT AND ENEMY GENERATION

const allLoot = {
  1: equipment.filter(eq => eq.tier == 1).concat(moves.filter(m => m.tier == 1)),
  2: equipment.filter(eq => eq.tier == 2).concat(moves.filter(m => m.tier == 2)),
  3: equipment.filter(eq => eq.tier == 3).concat(moves.filter(m => m.tier == 3)),
};

const allEnemies = {
  1: enemies.filter(e => e.tier == 1),
  2: enemies.filter(e => e.tier == 2),
  3: enemies.filter(e => e.tier == 3),
};

const randomChoice = (list) => list[Math.floor(Math.random() * list.length)];

const generateLoot = (floor) => [1, 2, 3].map((tier) => ({ ...randomChoice(allLoot[tier]) }));

const generateEnemies = (floor) => {
  const baseEnemies = [1, 2, 3].map((tier) => ({ ...randomChoice(allEnemies) }));
  baseEnemies.forEach((e) => {
    ["attack", "health", "speed", "red", "green", "blue"].forEach((stat) => {
      e[stat] = Math.round(e[stat] * 1.1 ** (floor - 1));
    });
  });
  return baseEnemies;
};

module.exports = {
  allGames,
  getGame,
  addPlayer,
  removePlayer,
  cancel,
  startGame,
  select,
  loot,
  move,
  progressBattle,
  startFinalBattle,
}