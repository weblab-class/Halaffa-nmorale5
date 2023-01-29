import React from 'react';
import './BattleUpper.css';

export default function BattleUpper(props) {
  const player1 = props.battleData[props.players[0]]
  const player2 = props.battleData[props.players[1]]
  return (
    <>
      <div className="battleUpper u-flexRow">
        <img
          className='sprite you'
          src={require('../../images/' + player1.back_sprite).default}
        />
        <div className="middle u-flexShrink">
        </div>
        <img
          className='sprite enemy'
          src={require('../../images/' + player2.sprite).default}
        />
      </div>
      <p>P1 health: {player1.health}</p>
      <p>P2 health: {player2.health}</p>
    </>
  )
}