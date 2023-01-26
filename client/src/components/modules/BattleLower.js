import React from 'react';
import MoveSelect from './MoveSelect';
import { MoveSummary, AwaitingOpponent } from './BattleTexts';

export default function BattleLower(props) {
  const game = props.battleData;
  if (game.animating) {
    return <MoveSummary
      playersTurn={game.turn == props.players[0]}
      moveName={props.attributes.moves.find(({id}) => id === game.lastMove).name}
    />
  }
  else if (game.turn == props.players[0]) {
    return <MoveSelect 
      attributes={props.attributes}
      battleData={props.battleData}
      players={props.players}
      makeMove={props.makeMove}
    />
  } else {
    return <AwaitingOpponent />
  }
}