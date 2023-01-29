import React, { useState, useEffect } from 'react';
import BattleLower from './BattleLower';
import BattleUpper from './BattleUpper';
import "./Battle.css";

export default function Battle(props) {
  // const [move, setMove] = useState(null); // will be eventually used for animations
  
  return (
    <div className="bg">
      <BattleUpper
        attributes={props.attributes}
        battleData={props.battleData}
        players={props.players}
      />
      <BattleLower
        attributes={props.attributes}
        battleData={props.battleData}
        players={props.players}
        makeMove={props.makeMove}
      />
    </div>
  )
}