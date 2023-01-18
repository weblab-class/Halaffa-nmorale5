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

export default function resolveMove(playerStats, enemyStats, moveId) {
  let player = {...playerStats};
  let enemy = {...enemyStats};
  moves[moveId](player, enemy);
  return [player, enemy];
}