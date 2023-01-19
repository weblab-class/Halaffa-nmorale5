import React from 'react';
import Battle from '../modules/Battle.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    let starter = this.props.attributes.starters[this.props.starter];
    let enemy = this.props.attributes.starters[0] // hard-coded enemy for now
    this.state = {
      gameData: {
        name: starter.name,
        sprite: starter.sprite,
        red: starter.red,
        green: starter.green,
        blue: starter.blue,
        speed: starter.speed,
        attack: starter.attack,
        health: starter.health,
        maxHealth: starter.health,
        xp: 0,
        moves: [0, 1, 2],
        equipment: [],
      },
      currentScreen: "battle",

      // hard-coded enemyData for now
      enemyData: {
        speed: enemy.speed,
        attack: enemy.attack,
        health: enemy.health,
        maxHealth: enemy.health,
        name: enemy.name,
        sprite: enemy.sprite,
      }
    };
  }

  onPlayerDied() {
    this.setState({
      currentScreen: "select"
    });
  }

  onEnemyDied(newHealth) {
    this.setState({
      currentScreen: "results",
      gameData: {
        health: newHealth,
        ...this.state.gameData,
      }
    });
  }

  render() {
    switch (this.state.currentScreen) {
      case "battle":
        return (
          <Battle 
            attributes={this.props.attributes} 
            gameData={this.state.gameData} 
            enemyData={this.state.enemyData}
            onPlayerDied={() => this.onPlayerDied()}
            onEnemyDied={(newHealth) => this.onEnemyDied(newHealth)}
          />
        )
      case "results":
        return (
          <p>results screen</p>
        )
      case "select":
        return (
          <p>enemy select screen</p>
        )
    }

  }
}