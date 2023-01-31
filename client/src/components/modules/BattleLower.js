import React from 'react';
import MoveSelect from './MoveSelect';
import { MoveSummary, AwaitingOpponent } from './BattleTexts';

export default function BattleLower(props) {
  let returnElem;
  const game = props.battleData;
  if (game.animating) {
    returnElem = <MoveSummary
      text={game.text}
    />
  }
  else if (game.turn == props.players[0]) {
    returnElem = <MoveSelect 
      attributes={props.attributes}
      battleData={props.battleData}
      players={props.players}
      makeMove={props.makeMove}
    />
  } else {
    returnElem = <AwaitingOpponent />
  }
  return (
    <div className="u-flexColumn u-flex-alignCenter">
      {returnElem}
    </div>
  )
}