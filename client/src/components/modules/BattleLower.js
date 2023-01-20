import React from 'react';
import MoveSelect from './MoveSelect';
import { MoveSummary, AwaitingOpponent, BattleResult } from './BattleTexts';

export default function BattleLower(props) {
  if (props.turnData.animating) {
    return <MoveSummary
      playersTurn={props.turnData.playersTurn}
      moveName={props.attributes.moves.find(({id}) => id == props.move).name}
      onFinished={props.events.onFinishedText}
    />
  } else if (props.battleData.playerDied || props.battleData.enemyDied) {
    return <BattleResult
      playerDied={props.battleData.playerDied}
      enemyDied={props.battleData.enemyDied}
      onFinished={props.events.onDeathTextCompleted}
    />
  } else if (props.turnData.playersTurn) {
    return <MoveSelect 
      attributes={props.attributes}
      gameData={props.gameData}
      onFinished={props.events.onClickMove}
    />
  } else {
    return <AwaitingOpponent
      onFinished={props.events.onEnemyMadeMove}
    />
  }
}