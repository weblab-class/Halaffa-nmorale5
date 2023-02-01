import React from 'react';
import "./LootResult.css";

export default function LootResults(props) {
  return (
    <div className="u-flexColumn u-flex-alignCenter bg">
      <h3>Loot Found:</h3>
      <p className="attribute">XP: {props.lootData.xp}</p>
      <p className="attribute">Red: {props.lootData.red}</p>
      <p className="attribute">Green: {props.lootData.green}</p>
      <p className="attribute">Blue: {props.lootData.blue}</p>
      <button className="button3 bg"  onClick={() => props.collectLoot(null)}>Collect</button>
    </div>
  )
}