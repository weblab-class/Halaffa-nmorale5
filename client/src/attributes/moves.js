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

status_mapping = {
  "sleep": 100,
  "burned": 101,
  "frozen": 102,
  "aim": 200,
  "bluemist": 201,
  "greenmist": 202,
  "redmist": 203,
  "blueroom": 204,
  "blueroots": 205,
  "greenroots": 206,
  "redroots": 207,
  "calmingmeadow": 208,
  "insomnia": 209,
  "downstream": 210,
  "fierypunch": 211,
  "fierytackle": 212,
  "firefrenzy": 213,
  "gamble": 214,
  "garden": 215,
  "risingtide": 216,
  "storm": 217,
  "wonderroom": 218
}

const doDamage = (move, player, enemy) => {
  let colorBonus = player.red;
  if (move.color == "blue") {
    colorBonus = player.blue;
  }
  if (move.color == "green") {
    colorBonus = player.green;
  }
  return { player: 0, enemy: -Math.round(move.power * Math.sqrt(player.attack + 2*colorBonus) / 100)}
}

const heal = (move, player, enemy) => {
  let colorBonus = player.red;
  if (move.color == "blue") {
    colorBonus = player.blue;
  }
  if (move.color == "green") {
    colorBonus = player.green;
  }
  return { player: Math.round(move.power * sqrt(player.attack + 2*colorBonus) / 100), enemy: 0}
}

const addStatus = (character, status) => {
  for (equip in character.equipment) {
    if (equip.id == 100 || equip.id == 101 || equip.id == 102 ||
       (equip.id == status_mapping["insomnia"] && status == "sleep")
       || equip.id == status_mapping["wonderroom"]) {
      return null;
    }
  }
  character.equipment.push(getEquipment(status_mapping[status]));
  return null;
}

const addExclusiveEffect = (character, status) => {
  statusID = status_mapping[status];
  for (equip in character.equipment) {
    if (equip.id == statusID || equip.id == status_mapping["wonderroom"]) {
      return null;
    }
  }
  character.equipment.push(getEquipment(status_mapping[status]));
  return null;
}

const addEffect = (character, status) => {
  for (equip in character.equipment) {
    if (equip.id == status_mapping["wonderroom"]) {
      return null;
    }
  }
  character.equipment.push(getEquipment(status_mapping[status]));
}

const checkStatus = (character, status) => {
  statusID = status_mapping[status];
  for (equip in character.equipment) {
    if (equip.id == statusID) {
      return true;
    }
  }
  return false;
}

const moveFuncs = {
  0: (move, player, enemy) => {
    return doDamage(move, player, enemy);
  },
  1: (move, player, enemy) => {
    return doDamage(move, player, enemy);
  },
  2: (move, player, enemy) => {
    if (0.2 > Math.random()) {
      addStatus(enemy, "frozen");
    }
    return doDamage(move, player, enemy);
  },
  3: (move, player, enemy) => {
    addEffect(enemy, "gamble");
    return { player: 0, enemy: 0 };
  },
  4: (move, player, enemy) => {
    addExclusiveEffect(player, "wonderroom");
    addExclusiveEffect(enemy, "wonderroom");
    return { player: 0, enemy: 0 };
  },
  5: (move, player, enemy) => {
    return heal(move, player, enemy);
  },
  6: (move, player, enemy) => {
     return doDamage(move, player, enemy);
  },
  7: (move, player, enemy) => {
    addExclusiveEffect(player, "blueroom");
    addExclusiveEffect(enemy, "blueroom");
    return { player: 0, enemy: 0 };
  },
  8: (move, player, enemy) => {
    move.power = Math.round(move.power*(speed)/20);
    return doDamage(move, player, enemy);
  },
  9: (move, player, enemy) => {
    addEffect(player, "garden");
    return doDamage(move, player, enemy);
  },
  10: (move, player, enemy) => {
    let damage = doDamage(move, player, enemy);
    damage[player] = Math.round(damage[enemy]/2);
    return damage;
  },
  11: (move, player, enemy) => {
    addStatus(enemy, "sleep");
    return { player: 0, enemy: 0 };
  },
  12: (move, player, enemy) => {
    if (0.5 > Math.random()) {
      addStatus(enemy, "burned");
    }
    return doDamage(move, player, enemy);
  },
  13: (move, player, enemy) => {
    addEffect(player, "downstream");
    return { player: 0, enemy: 0 };
  },
  14: (move, player, enemy) => {
    if (enemy.red > enemy.blue || enemy.green > enemy.blue) {
      addStatus(enemy, "frozen");
    }
    return doDamage(move, player, enemy);
  },
  15: (move, player, enemy) => {
    addEffect(player, "aim");
    return { player: 0, enemy: 0 };
  },
  16: (move, player, enemy) => {
     return doDamage(move, player, enemy);
  },
  17: (move, player, enemy) => {
     return doDamage(move, player, enemy);
  },
  18: (move, player, enemy) => {
     return doDamage(move, player, enemy);
  },
  19: (move, player, enemy) => {
     return heal(move, player, enemy);
  },
  20: (move, player, enemy) => {
     return heal(move, player, enemy);
  },
  21: (move, player, enemy) => {
    addExclusiveEffect(player, "redmist");
    return doDamage(move, player, enemy);
  },
  22: (move, player, enemy) => {
    addExclusiveEffect(player, "bluemist");
    return doDamage(move, player, enemy);
  },
  23: (move, player, enemy) => {
    addExclusiveEffect(player, "greenmist");
    return doDamage(move, player, enemy);
  },
  24: (move, player, enemy) => {
    addEffect(enemy, "fierypunch");
    return doDamage(move, player, enemy);
  },
  25: (move, player, enemy) => {
    addEffect(enemy, "fierytackle");
    return doDamage(move, player, enemy);
  },
  26: (move, player, enemy) => {
    addEffect(enemy, "calmingmeadow");
    return doDamage(move, player, enemy);
  },
  27: (move, player, enemy) => {
    if (0.3 > Math.random()) {
      addStatus(enemy, "burned");
    }
    return doDamage(move, player, enemy);
  },
  28: (move, player, enemy) => {
     return doDamage(move, player, enemy);
  },
  29: (move, player, enemy) => {
     return doDamage(move, player, enemy);
  },
  30: (move, player, enemy) => {
     return doDamage(move, player, enemy);
  },
  31: (move, player, enemy) => {
    if (checkStatus(player, "burned")) {
      move.power = 3*move.power;
      move.accuracy = 100;
    }
    return doDamage(move, player, enemy);
  },
  32: (move, player, enemy) => {
    addStatus(player, "burned");
    addStatus(enemy, "burned");
    return doDamage(move, player, enemy);
  },
  33: (move, player, enemy) => {
    addEffect(player, "risingtide");
    return doDamage(move, player, enemy);
  },
  34: (move, player, enemy) => {
    addExclusiveEffect(player, "insomnia");
    return heal(move, player, enemy);
  },
  35: (move, player, enemy) => {
    if (checkStatus(player, "frozen")) {
      move.power = 3*move.power;
    }
    return heal(move, player, enemy);
  },
  36: (move, player, enemy) => {
    let index = 0;
    for (equip in player.equipment){
      if (equip.id == status_mapping["frozen"]){
        player.equipment = player.equipment.splice(index, 1);
      }
    }
    return heal(move, player, enemy);
  },
  37: (move, player, enemy) => {
    addExclusiveEffect(player, "firefrenzy");
    return doDamage(move, player, enemy);
  },
  38: (move, player, enemy) => {
    addEffect(player, "redroots");
    return { player: 0, enemy: 0 };
  },
  39: (move, player, enemy) => {
    addEffect(player, "blueroots");
    return { player: 0, enemy: 0 };
  },
  40: (move, player, enemy) => {
    addEffect(player, "greenroots");
    return { player: 0, enemy: 0 };
  },
  41: (move, player, enemy) => {
    addExclusiveEffect(player, "storm");
    addExclusiveEffect(enemy, "storm");
    return { player: 0, enemy: 0 };
  },
  
  90: (move, player, enemy) => {
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
  }
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