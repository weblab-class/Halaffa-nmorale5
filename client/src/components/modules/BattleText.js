import React from 'react';

export default function BattleText(props) {
  const character = props.playersTurn ? "You" : "The enemy";
  const message = `${character} used ${props.moveName}!`;

  setTimeout(props.onFinishedText, 2000)

  return (
    <p>{message}</p>
  )
}