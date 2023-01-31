/**
 * move: {
 *  power
 *  accuracy
 *  color
 *  callbacks
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

// Note: equipment can buff attack and speed, or can directly buff moves' power and accuracy
// Equipment should not change health unless it's via a callback
// Equipment should never mutate other equipment, but may check to see if a player has a certain equipment

const equipmentFuncs = {
  90: (eq, player, enemy) => {
    // passively heal each turn via callback
    const heal = (moveResult) => player.health += 5;
    player.moves.forEach(move => move.callbacks.push(heal));
    enemy.moves.forEach(move => move.callbacks.push(heal));
  },
  91: (eq, player, enemy) => {
    // give a player 20% speed and 20% damage reduction
    player.speed *= 1.2;
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) enemy.health += moveResult.enemy * .2;
    }
    enemy.moves.forEach(move => move.callbacks.push(restore))
    // (in other words, when the enemy attacks and damages you, heal back 20% of the damage taken)
  },
  92: (eq, player, enemy) => {
    // next 3 attacks deal 50% more damage
    if (eq.lifetime == 0) { // lifetime should be initially 3 in equipment.json
      return true; // this will indicate to game-logic to destroy this equipment
    }
    player.attack *= 1.5;
    const decay = (moveResult) => eq.lifetime--;
    player.moves.forEach(move => move.callbacks.push(decay));
  },
  0: (eq, player, enemy) => {
    player.blue *= 2
  },
  1: (eq, player, enemy) => {
    player.red *= 2
  },
  2: (eq, player, enemy) => {
    player.attack += 5
  },
  3: (eq, player, enemy) => {
    player.speed *= 2
  },
  217: (eq, player, enemy) => {

  },
};

module.exports = (eq, player, enemy) => {
  console.log("equipment")
  console.log(eq)
  return equipmentFuncs[eq.id](eq, player, enemy)
};