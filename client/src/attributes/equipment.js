const equipment = require('./equipment.json');

const getEquipment = (eqId) => ({
  ...equipment.find(({id}) => id === eqId),
});

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
    player.attack = Math.round(player.attack*1.1);
  },
  18: (eq, player, enemy) => {
    player.attack = Math.round(player.attack*1.2);
  },
  32: (eq, player, enemy) => {
    player.attack = Math.round(player.attack*1.3);
  },
  1: (eq, player, enemy) => {
    const decay = (moveResult) => eq.lifetime--;
    player.moves.forEach(move => move.callbacks.push(decay));
    if (eq.lifetime <= 0) {
      player.attack = Math.round(player.attack*1.5);
      player.speed = Math.round(player.speed*1.5);
    }
  },
  2: (eq, player, enemy) => {
    player.speed = Math.round(player.speed*1.1);
  },
  19: (eq, player, enemy) => {
    player.speed = Math.round(player.speed*1.2);
  },
  33: (eq, player, enemy) => {
    player.speed = Math.round(player.speed*1.3);
  },
  3: (eq, player, enemy) => {
    const heal = (moveResult) => {
      player.health = Math.min(player.maxhealth, Math.round(player.maxhealth*1.05+player.health));
    }
    player.moves.forEach(move => move.callbacks.push(heal));
  },
  20: (eq, player, enemy) => {
    const heal = (moveResult) => {
      player.health = Math.min(player.maxhealth, Math.round(player.maxhealth*1.08+player.health));
    }
    player.moves.forEach(move => move.callbacks.push(heal));
  },
  34: (eq, player, enemy) => {
    const heal = (moveResult) => {
      player.health = Math.min(player.maxhealth, Math.round(player.maxhealth*1.1+player.health));
    }
    player.moves.forEach(move => move.callbacks.push(heal));
  },
  4: (eq, player, enemy) => {
    enemy.moves.forEach(move => move.accuracy*.95);
  },
  21: (eq, player, enemy) => {
    enemy.moves.forEach(move => move.accuracy*.9);
  },
  35: (eq, player, enemy) => {
    enemy.moves.forEach(move => move.accuracy*.85);
  },
  5: (eq, player, enemy) => {
    for (move in player.moves){
      if (move.color == "green") {
        move.power = Math.round(move.power*1.1);
      }
    }
  },
  22: (eq, player, enemy) => {
    for (move in player.moves){
      if (move.color == "green") {
        move.power = Math.round(move.power*1.2);
      }
    }
  },
  36: (eq, player, enemy) => {
    for (move in player.moves){
      if (move.color == "green") {
        move.power = Math.round(move.power*1.3);
      }
    }
  },
  6: (eq, player, enemy) => {
    for (move in player.moves){
      if (move.color == "blue") {
        move.power = Math.round(move.power*1.1);
      }
    }
  },
  23: (eq, player, enemy) => {
    for (move in player.moves){
      if (move.color == "blue") {
        move.power = Math.round(move.power*1.2);
      }
    }
  },
  37: (eq, player, enemy) => {
    for (move in player.moves){
      if (move.color == "blue") {
        move.power = Math.round(move.power*1.3);
      }
    }
  },
  7: (eq, player, enemy) => {
    for (move in player.moves){
      if (move.color == "red") {
        move.power = Math.round(move.power*1.1);
      }
    }
  },
  24: (eq, player, enemy) => {
    for (move in player.moves){
      if (move.color == "red") {
        move.power = Math.round(move.power*1.2);
      }
    }
  },
  38: (eq, player, enemy) => {
    for (move in player.moves){
      if (move.color == "red") {
        move.power = Math.round(move.power*1.3);
      }
    }
  },
  8: (eq, player, enemy) => {
    for (move in player.moves){
      move.power = Math.round(move.power*1.05);
    }
  },
  25: (eq, player, enemy) => {
    for (move in player.moves){
      move.power = Math.round(move.power*1.10);
    }
  },
  39: (eq, player, enemy) => {
    for (move in player.moves){
      move.power = Math.round(move.power*1.15);
    }
  },
  9: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .15);
      }
    }
    for (move in enemy.moves){
      if (move.color == "green") {
        move.callbacks.push(restore);
      }
    }
  },
  26: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .3);
      }
    }
    for (move in enemy.moves){
      if (move.color == "green") {
        move.callbacks.push(restore);
      }
    }
  },
  40: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .4);
      }
    }
    for (move in enemy.moves){
      if (move.color == "green") {
        move.callbacks.push(restore);
      }
    }
  },
  10: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .15);
      }
    }
    for (move in enemy.moves){
      if (move.color == "blue") {
        move.callbacks.push(restore);
      }
    }
  },
  27: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .3);
      }
    }
    for (move in enemy.moves){
      if (move.color == "blue") {
        move.callbacks.push(restore);
      }
    }
  },
  41: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .4);
      }
    }
    for (move in enemy.moves){
      if (move.color == "blue") {
        move.callbacks.push(restore);
      }
    }
  },
  11: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .15);
      }
    }
    for (move in enemy.moves){
      if (move.color == "red") {
        move.callbacks.push(restore);
      }
    }
  },
  28: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .3);
      }
    }
    for (move in enemy.moves){
      if (move.color == "red") {
        move.callbacks.push(restore);
      }
    }
  },
  42: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .4);
      }
    }
    for (move in enemy.moves){
      if (move.color == "red") {
        move.callbacks.push(restore);
      }
    }
  },
  12: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .1);
      }
    }
    enemy.moves.forEach(move => move.callbacks.push(restore));
  },
  29: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .2);
      }
    }
    enemy.moves.forEach(move => move.callbacks.push(restore));
  },
  43: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .25);
      }
    }
    enemy.moves.forEach(move => move.callbacks.push(restore));
  },
  13: (eq, player, enemy) => {
    for (move in player.moves){
      move.power = Math.round(move.power*1.2);
    }
    const hurt = (moveResult) => {
      player.health -= 5;
    }
    player.moves.forEach(move => move.callbacks.push(hurt));
  },
  30: (eq, player, enemy) => {
    for (move in player.moves){
      move.power = Math.round(move.power*1.3);
    }
    const hurt = (moveResult) => {
      player.health -= 5;
    }
    player.moves.forEach(move => move.callbacks.push(hurt));
  },
  44: (eq, player, enemy) => {
    for (move in player.moves){
      move.power = Math.round(move.power*1.4);
    }
    const hurt = (moveResult) => {
      player.health -= 5;
    }
    player.moves.forEach(move => move.callbacks.push(hurt));
  },
  14: (eq, player, enemy) => {
    const reflect = (moveResult) => {
      if (moveResult.enemy < 0){
        player.health += moveResult.enemy;
        enemy.health -= moveResult.enemy;
        moveResult.text.push("The attack was reflected!");
        eq.lifetime--;
      }
    }
    enemy.moves.forEach(move => move.callbacks.push(reflect));
    if (eq.lifetime == 0) {
      return true; // this will indicate to game-logic to destroy this equipment
    }
  },
  15: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .2);
      }
    }
    enemy.moves.forEach(move => move.callbacks.push(restore));
    player.moves.forEach(move => move.callbacks.push(restore));
    player.speed = Math.round(player.speed * 0.75);
  },
  31: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .3);
      }
    }
    const restore2 = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .2);
      }
    }
    enemy.moves.forEach(move => move.callbacks.push(restore));
    player.moves.forEach(move => move.callbacks.push(restore2));
    player.speed = Math.round(player.speed * 0.75);
  },
  45: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .3);
      }
    }
    const restore2 = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .15);
      }
    }
    enemy.moves.forEach(move => move.callbacks.push(restore));
    player.moves.forEach(move => move.callbacks.push(restore2));
  },
  16: (eq, player, enemy) => {
    const eat = (moveResult) => {
      if (moveResult.enemy < -player.maxhealth*0.3) {
        enemy.health -= moveResult.enemy;
        moveResult.text.push("A Strawberry was eaten!")
        eq.lifetime--;
      }
    }
    enemy.moves.forEach(move => move.callbacks.push(eat));
    if (eq.lifetime == 0) {
      return true; // this will indicate to game-logic to destroy this equipment
    }
  },
  17: (eq, player, enemy) => {
    const hurt = (moveResult) => {
      if (moveResult.enemy < 0) {
        player.health -= 1;
        moveResult.text.push("You were hurt by Thorns.")
      }
    }
    enemy.moves.forEach(move => move.callbacks.push(hurt));
  },
  46: (eq, player, enemy) => {
    const hurt = (moveResult) => {
      if (moveResult.enemy < 0) {
        player.health -= 2;
        moveResult.text.push("You were hurt by Thorns.")
      }
    }
    enemy.moves.forEach(move => move.callbacks.push(hurt));
  },
  47: (eq, player, enemy) => {
    const hurt = (moveResult) => {
      if (moveResult.enemy < 0) {
        player.health -= 3;
        moveResult.text.push("You were hurt by Thorns.")
      }
    }
    enemy.moves.forEach(move => move.callbacks.push(hurt));
  },
  100: (eq, player, enemy) => {
    const sleep = (moveResult) => {
      moveResult.text = ["You are asleep."]
      eq.lifetime--;
    }
    player.moves.forEach(move => move.callbacks.push(sleep));
    player.moves.forEach(move => move.accuracy = -100);
    if (eq.lifetime == 0) {
      return true; // this will indicate to game-logic to destroy this equipment
    }
  },
  101: (eq, player, enemy) => {
    const burn = (moveResult) => {
      player.health -= Math.round(player.maxhealth*0.08);
      moveResult.text.push("You suffer from burns.");
    }
    player.moves.forEach(move => move.callbacks.push(burn));
  },
  102: (eq, player, enemy) => {
    const freeze = (moveResult) => {
      eq.lifetime--;
    }
    player.speed = Math.round(player.speed*0.5);
    player.moves.forEach(move => move.callbacks.push(freeze));
    if (eq.lifetime == 0) {
      return true; // this will indicate to game-logic to destroy this equipment
    }
  },
  200: (eq, player, enemy) => {
    const aim = (moveResult) => {
      eq.lifetime--;
    }

    player.moves.forEach(move => move.callbacks.push(aim));
    player.moves.forEach(move => move.accuracy = 10000);
    if (eq.lifetime == 0) {
      return true; // this will indicate to game-logic to destroy this equipment
    }
  },
  201: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .3);
      }
    }
    for (move in enemy.moves){
      if (move.color == "blue") {
        move.callbacks.push(restore);
      }
    }
  },
  202: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .3);
      }
    }
    for (move in enemy.moves){
      if (move.color == "green") {
        move.callbacks.push(restore);
      }
    }
  },
  203: (eq, player, enemy) => {
    const restore = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health -= Math.round(moveResult.enemy * .3);
      }
    }
    for (move in enemy.moves){
      if (move.color == "red") {
        move.callbacks.push(restore);
      }
    }
  },
  204: (eq, player, enemy) => {
    for (move in player.moves){
      if (move.color == "blue") {
        move.power = Math.round(move.power*1.5);
      }
    }
  },
  205: (eq, player, enemy) => {
    for (move in enemy.moves){
      if (move.color == "blue") {
        move.power = Math.round(move.power*0.8);
      }
    }
  },
  206: (eq, player, enemy) => {
    for (move in enemy.moves){
      if (move.color == "green") {
        move.power = Math.round(move.power*0.8);
      }
    }
  },
  207: (eq, player, enemy) => {
    for (move in enemy.moves){
      if (move.color == "red") {
        move.power = Math.round(move.power*0.8);
      }
    }
  },
  208: (eq, player, enemy) => {
    const decay = (moveResult) => {
      eq.lifetime--;
      if (eq.lifetime == 0) {
        player.equipment.push(getEquipment(100));
      }
      moveResult.text.push("The calming meadow lulls you into a deep slumber.")
    }
    player.moves.forEach(move => move.callbacks.push(decay));
    if (eq.lifetime == 0) {
      return true; // this will indicate to game-logic to destroy this equipment
    }
  },
  209: (eq, player, enemy) => {
    //lol insomnia
  },
  210: (eq, player, enemy) => {
    const more = (moveResult) => {
      if (moveResult.enemy < 0) {
        enemy.health += Math.round(moveResult.enemy * .3);
      }
    }
    player.moves.forEach(move => move.callbacks.push(more));
  },
  211: (eq, player, enemy) => {
    const decay = (moveResult) => {
      eq.lifetime--;
    }
    player.moves.forEach(move => move.accuracy -= 20);
    player.moves.forEach(move => move.callbacks.push(decay));
    if (eq.lifetime == 0) {
      return true; // this will indicate to game-logic to destroy this equipment
    }
  },
  212: (eq, player, enemy) => {
    const decay = (moveResult) => {
      eq.lifetime--;
    }
    console.log("accuracy")
    console.log(move)
    player.moves.forEach(move => move.accuracy += 20);
    player.moves.forEach(move => move.callbacks.push(decay));
    console.log(move)
    if (eq.lifetime == 0) {
      return true; // this will indicate to game-logic to destroy this equipment
    }
  },
  213: (eq, player, enemy) => {
    player.red = 0;
  },
  214: (eq, player, enemy) => {
    const decay = (moveResult) => {
      eq.lifetime--;
    }
    player.moves.forEach(move => move.accuracy = Math.round(move.accuracy*0.5));
    player.moves.forEach(move => move.callbacks.push(decay));
    if (eq.lifetime == 0) {
      return true; // this will indicate to game-logic to destroy this equipment
    }
  },
  215: (eq, player, enemy) => {
    const heal = (moveResult) => {
      player.health += Math.min(Math.round(player.maxhealth*0.12), player.maxhealth-player.health);
      eq.lifetime--;
      moveResult.text.push("The garden harvest offers some restoration.")
    }
    player.moves.forEach(move => move.callbacks.push(heal));
    if (eq.lifetime == 0) {
      return true; // this will indicate to game-logic to destroy this equipment
    }
  },
  216: (eq, player, enemy) => {
    for (move in player.moves){
      if (move.id == 33) {   // 33 = Rising Tide
        move.power += 20;
      }
    }
  },
  217: (eq, player, enemy) => {
    const damage = (moveResult) => {
      player.health -= player.red;
      moveResult.text.push("The storm chips away.")
    }
    player.moves.forEach(move => move.callbacks.push(damage));
  },
  218: (eq, player, enemy) => {
    const remove = (moveResult) => {
      player.equipment = [getEquipment(218)];
      moveResult.text.push("Wonder Room has permanently disabled equipment and effects!");
    }
    player.moves.forEach(move => move.callbacks.push(remove));
  },
  1000: (eq, player, enemy) => {
    player.blue *= 2
  },
  1001: (eq, player, enemy) => {
    player.red *= 2
  },
  1002: (eq, player, enemy) => {
    player.attack += 5
  },
  1003: (eq, player, enemy) => {
    player.speed *= 2
  },
};

module.exports = (eq, player, enemy) => {
  console.log("equipment")
  console.log(eq)
  return equipmentFuncs[eq.id](eq, player, enemy)
};