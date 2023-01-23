function damage(player, enemy, amount) {
  enemy.health -= amount
}

const moves = {
  0: (player, enemy) => {
    damage(player, enemy, 1);
  },
  1: (player, enemy) => {
    damage(player, enemy, 2);
  },
  2: (player, enemy) => {
    damage(player, enemy, 3);
  }
}

function resolveMove(playerStats, enemyStats, moveId, playerAttacksEnemy=true) {
  let player = {...playerStats};
  let enemy = {...enemyStats};
  if (playerAttacksEnemy) moves[moveId](player, enemy);
  else                    moves[moveId](enemy, player);
  return [player, enemy];
}

module.exports = resolveMove;