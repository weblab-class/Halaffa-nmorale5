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
      // battleData: null,
      // enemySelectOptions: null,
      // lootSummary: null,
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

  // setupBattleData() {
  //   let player = this.state.gameData;
  //   let enemy = this.props.attributes.starters[1];
  //   this.setState({
  //     currentScreen: "battleData",
  //     battleData: {
  //       turn: 1,
  //       player: {
  //         speed: player.speed,
  //         attack: player.attack,
  //         health: player.health,
  //         maxHealth: player.maxHealth,
  //       },
  //       enemy: {
  //         speed: enemy.speed,
  //         attack: enemy.attack,
  //         health: enemy.health,
  //         maxHealth: enemy.health,
  //         name: enemy.name,
  //         sprite: enemy.sprite,
  //       },
  //     }
  //   });
  // }

  render() {
    if (!this.state.currentScreen) return <p>Loading...</p>
    return (
      <Battle 
        attributes={this.props.attributes} 
        gameData={this.state.gameData} 
        enemyData={this.state.enemyData}
      />
    )
  }
}