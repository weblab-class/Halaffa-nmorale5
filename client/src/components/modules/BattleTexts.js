import React from 'react';

export function MoveSummary(props) {
  setTimeout(props.onFinished, 2000);
  return (
    <p>{`${props.playersTurn ? "You" : "The enemy"} used ${props.moveName}!`}</p>
  );
}

export function AwaitingOpponent(props) {
  return (
    <p>Waiting for opponent's move...</p>
  )
}

export function BattleResult(props) {
  return (
    <>
      <p>{props.playerDied ? "You lose." : "You win!"}</p>
      <button onClick={props.onFinished}>Proceed</button>
    </>
  )
}

