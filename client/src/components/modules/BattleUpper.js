import React from 'react';
import './BattleUpper.css';

export default class BattleUpper extends React.Component {
  render() {
    return (
      <>
        <img
          className='sprite'
          src={require('../../images/' + this.props.players[0].sprite).default}
        />
        <img
          className='sprite'
          src={require('../../images/' + this.props.players[1].sprite).default}
        />
        <p>P1 health: {this.props.players[0].health}</p>
        <p>P2 health: {this.props.players[1].health}</p>
      </>
    )
  }
}