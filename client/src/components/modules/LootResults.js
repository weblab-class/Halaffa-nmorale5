import React from 'react';

export default function LootResults(props) {
  return (
    <div onClick={() => props.collectLoot({})}>
      <h3>Loot Found:</h3>
      <ul>
        <li>XP: {props.lootData.xp}</li>
        <li>Red: {props.lootData.red}</li>
        <li>Green: {props.lootData.green}</li>
        <li>Blue: {props.lootData.blue}</li>
      </ul>
      <h4>(click to collect)</h4>
    </div>
  )
}