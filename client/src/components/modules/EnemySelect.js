import React from 'react';
import EnemyOption from './EnemyOption';
import "./EnemySelect.css";

export default function EnemySelect(props) {
  return (
    <div className="u-flex u-flexWrap u-flex-justifyCenter bg">
      {props.selectionData.loot.map((option, i) => (
        <EnemyOption
          key={i}
          option={option}
          onClick={() => props.selectOption(i)}
        />
      ))}
    </div>
  ) 
}