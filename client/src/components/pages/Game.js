import React from 'react';
import Battle from '../modules/Battle.js';
import EnemySelect from '../modules/EnemySelect.js';
import LootResults from '../modules/LootResults.js';
import Stats from '../modules/Stats.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    let starter = this.props.attributes.starters[this.props.starter]; //TODO: Change with get(/api/starter)
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
        xp: starter.XP,
        moves: starter.moves,
        equipment: starter.equipment,
      },
      currentScreen: "select",
    };
  }

  onPlayerDied() {
    this.setState({
      currentScreen: "select",
    });
  }

  onEnemyDied() {
    this.setState({
      currentScreen: "results",
    });
  }

  onEnemyChosen(option) {
    this.setState({
      currentScreen: "battle",
      enemyData: option.enemyData,
      lootData: {
        enemyData: undefined,
        ...option,
      }
    });
  }

  onLootCollected() {
    this.setState({
      currentScreen: "select",
      gameData: {
        ...this.state.gameData,
        xp: this.state.lootData.xp + this.state.gameData.xp,
        red: this.state.lootData.red + this.state.gameData.red,
        green: this.state.lootData.green + this.state.gameData.green,
        blue: this.state.lootData.blue + this.state.gameData.blue,
        moves: this.state.gameData.moves.concat(this.state.lootData.moves),
        equipment: this.state.gameData.equipment.concat(this.state.lootData.equipment),
      }
    })
  }

  render() {
    let screen;
    switch (this.state.currentScreen) {
      case "battle":
        screen = (
          <Battle 
            attributes={this.props.attributes} 
            gameData={this.state.gameData} 
            enemyData={this.state.enemyData}
            onPlayerDied={() => this.onPlayerDied()}
            onEnemyDied={() => this.onEnemyDied()}
          />
        );
        break;
      case "results":
        screen = (
          <LootResults
            loot={this.state.lootData}
            onClick={() => this.onLootCollected()}
          />
        );
        break;
      case "select":
        screen = (
          <EnemySelect
            attributes={this.props.attributes}
            onEnemyChosen={(enemy) => this.onEnemyChosen(enemy)}
          />
        );
    }
    return (
      <>
        <Stats
          attributes={this.props.attributes}
          stats={this.state.gameData}
        />
        {screen}
      </>
    )

  }
}