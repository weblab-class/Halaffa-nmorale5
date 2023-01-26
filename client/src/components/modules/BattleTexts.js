import React from 'react';

export function MoveSummary(props) {
  return (
    <p>{`${props.playersTurn ? "You" : "The enemy"} used ${props.moveName}!`}</p>
  );
}

export function AwaitingOpponent(props) {
  return (
    <p>Waiting for opponent's move...</p>
  )
}
