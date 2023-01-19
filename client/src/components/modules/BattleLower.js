import React from 'react';
import MoveSelect from './MoveSelect';
import BattleText from './BattleText';

export default function BattleLower(props) {
  return (!props.animating && props.playersTurn) ? (
    <MoveSelect 
      attributes={props.attributes}
      gameData={props.gameData}
      player={props.player}
      enemy={props.enemy}
      onClickMove={props.onClickMove}
    />
  ) : (
    <BattleText
      playersTurn={props.playersTurn}
      moveName={props.attributes.moves.find(({id}) => id == props.move).name}
      onFinishedText={props.onFinishedText}
      playerDied={props.playerDied}
      enemyDied={props.enemyDied}
      animating={props.animating}
    />
  )
}