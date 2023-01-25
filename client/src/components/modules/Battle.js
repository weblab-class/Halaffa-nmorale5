import React, { useState, useEffect } from 'react';
import BattleLower from './BattleLower';
import BattleUpper from './BattleUpper';

export default function Battle(props) {
  // const [move, setMove] = useState(null); // will be eventually used for animations
  
  if (gameState) {
    return (
      <>
        <BattleUpper
          attributes={props.attributes}
          gameState={gameState}
        />
        <BattleLower
          attributes={props.attributes}
          gameState={gameState}
          makeMove={makeMove}
          playerId={props.playerId}
        />
      </>
    )
  } else {
    return (
      <button
        onClick={startBattle}
      >
        Start the Battle!
      </button>
    )
  }
  
}