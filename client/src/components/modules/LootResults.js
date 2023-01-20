import React from 'react';

export default function LootResults(props) {
  return (
    <div onClick={props.onClick}>
      <h3>Loot Found:</h3>
      <ul>
        <li>XP: {props.loot.xp}</li>
        <li>Red: {props.loot.red}</li>
        <li>Green: {props.loot.green}</li>
        <li>Blue: {props.loot.blue}</li>
      </ul>
      <h4>(click to collect)</h4>
    </div>
  )
}