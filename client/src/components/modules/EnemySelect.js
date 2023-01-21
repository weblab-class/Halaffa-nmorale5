import React from 'react';
import EnemyOption from './EnemyOption';

export default class EnemySelect extends React.Component {
  generateEnemyOptions() {
    const enemy = this.props.attributes.enemies[0]
    return [
      {
        difficulty: 'easy',
        xp: 3,
        red: 0,
        green: 3,
        blue: 2,
        moves: [],
        equipment: [0],
        enemyData: {
          speed: enemy.speed - 2,
          attack: enemy.attack - 2,
          health: enemy.health - 2,
          maxHealth: enemy.health - 2,
          name: enemy.name,
          sprite: enemy.sprite,
        }
      },
      {
        difficulty: 'medium',
        xp: 5,
        red: 6,
        green: 1,
        blue: 2,
        moves: [],
        equipment: [1],
        enemyData: {
          speed: enemy.speed,
          attack: enemy.attack,
          health: enemy.health,
          maxHealth: enemy.health,
          name: enemy.name,
          sprite: enemy.sprite,
        }
      },
      {
        difficulty: 'hard',
        xp: 8,
        red: 4,
        green: 5,
        blue: 5,
        moves: [],
        equipment: [2],
        enemyData: {
          speed: enemy.speed + 2,
          attack: enemy.attack + 2,
          health: enemy.health + 2,
          maxHealth: enemy.health + 2,
          name: enemy.name,
          sprite: enemy.sprite,
        }
      }
    ]
  }

  render() {
    const options = this.generateEnemyOptions();
    const choices = options.map((option, i) => {
      return (
        <EnemyOption
          key={i}
          option={option}
          onClick={() => this.props.onEnemyChosen(option)}
        />
      )
    });
    return choices;
  }
}