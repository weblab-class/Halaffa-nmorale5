const equipment = require('./equipment.json');

const getEquipment = (eqId) => ({
  ...equipment.find(({id}) => id === eqId),
});

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
  90: (move, player, enemy) => {
    // deal a some damage and heal a bit
    return { player: move.power * .2, enemy: -move.power * .5 };
  },
  91: (move, player, enemy) => {
    // cast storm on both players
    player.equipment.push(getEquipment(217));
    enemy.equipment.push(getEquipment(217));
    return { player: 0, enemy: 0 };
  },
  92: (move, player, enemy) => {
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
  0: (move, player, enemy) => {
    return { player: 0, enemy: -1 };
  },
  1: (move, player, enemy) => {
    return { player: 0, enemy: -2 };
  },
  2: (move, player, enemy) => {
    return { player: 0, enemy: -3 };
  },
};

module.exports = (move, player, enemy) => {
  console.log("move")
  console.log(move)
  if (move.accuracy/100 > Math.random()) {
    const moveSummary = moveFuncs[move.id](move, player, enemy);
    player.health += moveSummary.player;
    enemy.health += moveSummary.enemy;
    if (moveSummary.missed === undefined) moveSummary.missed = false;
    if (moveSummary.text === undefined) moveSummary.text = [];
    moveSummary.text.unshift(`${player.name} used ${move.name}!`)
    return moveSummary;
  }
  return { player: 0, enemy: 0, missed: true, text: [`${player.name} used ${move.name}!`, "It missed!"] };
}