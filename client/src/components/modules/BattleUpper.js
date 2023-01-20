import React from 'react';
import './BattleUpper.css';

export default class BattleUpper extends React.Component {
  render() {
    return (
      <>
        <img
          className='sprite'
          src={require('../../images/' + this.props.gameData.sprite).default}
        />
        <img
          className='sprite'
          src={require('../../images/' + this.props.enemyInfo.sprite).default}
        />
        <p>Your health: {this.props.player.health}</p>
        <p>Enemy health: {this.props.enemy.health}</p>
      </>
    )
  }
}