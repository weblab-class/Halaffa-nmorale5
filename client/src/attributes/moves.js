const equipment = require('../client/src/attributes/equipment.json');
const equipmentFuncs = require('../client/src/attributes/equipment.js');

const getEquipment = (eqId) => {
  const eq = { ...equipment.find(({id}) => id === eqId) };
  eq.func = equipmentFuncs[eqId];
  return eq;
};

/**
 * move: {
 *  power
 *  accuracy
 *  color
 * }
 * 
 * player/enemy: {
 *  attack
 *  health
 *  speed
 *  equipment
 *  moves
 * }
 */

// Note: moves should never tamper with other moves, player stats, or equipment 
// (unless it's adding a new equipment).

const moveFuncs = {
  0: (move, player, enemy) => {
    // deal some damage
    return { player: 0, enemy: -move.power * .5 };
  },
  100: (move, player, enemy) => {
    // deal a some damage and heal a bit
    return { player: move.power * .2, enemy: -move.power * .5 };
  },
  101: (move, player, enemy) => {
    // cast storm on both players
    player.equipment.push(getEquipment(217));
    enemy.equipment.push(getEquipment(217));
    return { player: 0, enemy: 0 };
  },
  102: (move, player, enemy) => {
    // damage enemy for each of their red moves, and heal for each of your green moves
    let redMult = 0;
    let greenMult = 0;
    enemy.moves.forEach(move => {
      if (move.color == 'red') redMult++;
    });
    player.moves.forEach(move => {
      if (move.color == 'green') greenMult++;
    })
    return { player: move.power * greenMult, enemy: -move.power * redMult };
  },
};

module.exports = (move, player, enemy) => {
  if (move.accuracy > Math.random()) {
    const healthDiffs = moveFuncs[move.id](move, player, enemy);
    player.health += healthDiffs.player;
    enemy.health += healthDiffs.enemy;
    return { ...healthDiffs, missed: false };
  }
  return { player: 0, enemy: 0, missed: true }
}