import React from 'react';
import EnemyOption from './EnemyOption';

export default function EnemySelect(props) {
  return props.selectionData.map((option, i) => (
    <EnemyOption
      key={i}
      option={option}
      onClick={() => props.selectOption(i)}
    />
  ));
}