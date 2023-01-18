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
    };
  }

  onClickMove(moveId) {
    let [player, enemy] = resolveMove(this.state.player, this.state.enemy, moveId);
    this.setState({ player, enemy })
  }

  render() {
    return (
      <div>
        <BattleUpper
          attributes={this.props.attributes}
          gameData={this.props.gameData}
          player={this.state.player}
          enemy={this.state.enemy}
        />
        <BattleLower
          attributes={this.props.attributes}
          gameData={this.props.gameData}
          player={this.state.player}
          enemy={this.state.enemy}
          onClickMove={(moveId) => this.onClickMove(moveId)}
        />
      </div>
    )
  }
}