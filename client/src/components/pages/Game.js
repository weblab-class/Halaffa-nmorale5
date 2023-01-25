import React from 'react';
import Battle from '../modules/Battle.js';
import EnemySelect from '../modules/EnemySelect.js';
import LootResults from '../modules/LootResults.js';
import Stats from '../modules/Stats.js';

export default function Game(props) {
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