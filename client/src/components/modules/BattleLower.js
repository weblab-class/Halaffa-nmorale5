import React from 'react';
import MoveSelect from './MoveSelect';
import BattleText from './BattleText';

export default function BattleLower(props) {
  if (!props.animating) return (
    <MoveSelect 
      attributes={props.attributes}
      gameData={props.gameData}
      player={props.player}
      enemy={props.enemy}
      onClickMove={props.onClickMove}
    />
  )

  else return (
    <BattleText
      playersTurn={props.playersTurn}
      moveName={props.attributes.moves.find(({id}) => id === props.move)}
      onFinishedText={props.onFinishedText}
    />
  )
}