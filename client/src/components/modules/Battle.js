import React, { useState, useEffect } from 'react';
import BattleLower from './BattleLower';
import BattleUpper from './BattleUpper';

export default function Battle(props) {
  // const [move, setMove] = useState(null); // will be eventually used for animations
  
  return (
    <>
      <BattleUpper
        attributes={props.attributes}
        battleData={props.battleData}
      />
      <BattleLower
        attributes={props.attributes}
        battleData={props.battleData}
        makeMove={makeMove}
      />
    </>
  )
}