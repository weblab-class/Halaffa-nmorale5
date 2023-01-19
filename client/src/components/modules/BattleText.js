import React from 'react';

export default function BattleText(props) {
  let message;
  let skip = false;
  if (props.playerDied) {
    message = "You lose.";
  } else if (props.enemyDied) {
    message = "You win!";
  } else if (props.animating) {
    message = `${props.playersTurn ? "You" : "The enemy"} used ${props.moveName}!`;
  } else {
    message = 'Waiting for enemy move...';
    skip = true;
  }

  setTimeout(props.onFinishedText, skip? 0 : 2000);

  return (
    <p>{message}</p>
  );
}