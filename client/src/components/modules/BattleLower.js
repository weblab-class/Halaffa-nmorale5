import React from 'react';
import MoveSelect from './MoveSelect';
import { MoveSummary, AwaitingOpponent, BattleResult } from './BattleTexts';

export default function BattleLower(props) {
  const game = props.gameState;
  if (game.turn === null) {
    return <p>Game not ongoing</p>
  } else if (game.players[game.turn].id === props.playerId) {
    return <MoveSelect 
      attributes={props.attributes}
      gameState={props.gameState}
      onFinished={props.makeMove}
    />
  } else {
    return <p>Waiting for opponent's move...</p>
  }
}