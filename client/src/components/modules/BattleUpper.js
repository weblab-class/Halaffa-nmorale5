import React from 'react';
import './BattleUpper.css';

export default function BattleUpper(props) {
  const player1 = props.gameState.players[0]
  const player2 = props.gameState.players[1]
  return (
    <>
      <img
        className='sprite'
        src={require('../../images/' + player1.sprite).default}
      />
      <img
        className='sprite'
        src={require('../../images/' + player2.sprite).default}
      />
      <p>P1 health: {player1.health}</p>
      <p>P2 health: {player2.health}</p>
    </>
  )
}