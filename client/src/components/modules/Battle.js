import React from 'react';
import resolveMove from '../../attributes/moves';
import BattleLower from './BattleLower';
import BattleUpper from './BattleUpper';

export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    const player = this.props.gameData;
    const enemy = this.props.enemyData;
    this.state = {
      player: {
        speed: player.speed,
        attack: player.attack,
        health: player.health,
        maxHealth: player.maxHealth,
      },
      enemy: {
        speed: enemy.speed,
        attack: enemy.attack,
        health: enemy.health,
        maxHealth: enemy.health,
        name: enemy.name,
        sprite: enemy.sprite,
      },

      turn: 1,
      playersTurn: true,
      move: null,
      animating: false,
      playerDied: false,
      enemyDied: false,
    };
  }

  makeMove(moveId, playerAttacksEnemy) {
    let [player, enemy] = resolveMove(this.state.player, this.state.enemy, moveId, playerAttacksEnemy);
    this.setState({ 
      player: player, 
      enemy: enemy,
      move: moveId,
      animating: true,
    });
  }

  onFinishedMove(moveId) {
    this.makeMove(moveId, true);
  }

  onFinishedText() {
    if (this.state.playerDied) return this.props.onPlayerDied();
    else if (this.state.enemyDied) return this.props.onEnemyDied(this.state.player.health);

    if (this.state.animating) {
      const playerDied = this.state.player.health <= 0;
      const enemyDied = this.state.enemy.health <= 0;
      this.setState({
        playersTurn: !this.state.playersTurn,
        animating: false,
        playerDied: playerDied,
        enemyDied: enemyDied,
      })
    } else {
      this.chooseEnemyMove();
    }
  }

  onEnemyMadeMove(moveId) {
    this.makeMove(moveId, false);
  }

  chooseEnemyMove() {
    const move = 0; // hard-coded move for now
    setTimeout(() => this.onEnemyMadeMove(move), 1000); // simulates waiting for opponent over network
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <>
        <BattleUpper
          attributes={this.props.attributes}
          gameData={this.props.gameData}
          player={this.state.player}
          enemy={this.state.enemy}
          animating={this.state.animating}
        />
        <BattleLower
          attributes={this.props.attributes}
          gameData={this.props.gameData}
          player={this.state.player}
          enemy={this.state.enemy}
          onClickMove={(moveId) => this.onFinishedMove(moveId)}
          onFinishedText={() => this.onFinishedText()}
          onEnemyTurn={() => this.chooseEnemyMove()}
          playersTurn={this.state.playersTurn}
          move={this.state.move}
          animating={this.state.animating}
          playerDied={this.state.playerDied}
          enemyDied={this.state.enemyDied}
        />
      </>
    )
  }
}