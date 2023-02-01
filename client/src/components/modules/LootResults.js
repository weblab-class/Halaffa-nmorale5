import React, { useState } from 'react';
import "./LootResult.css";
import "./MoveButton.js";

export default function LootResults(props) {
  if (props.lootData.color && props.moves.length == 3) {
    // move
    const [desc, setDesc] = useState(null)
    const onHover = (move) => {
      setDesc(move);
    }
    const onUnhover = (move) => {
      setDesc(null)
    }
    const currentMoves = props.moves.map((moveId, i) => {
      const move = props.attributes.moves.find(({id}) => id === moveId);
      return (
        <>
          <MoveButton
            key={i}
            name={move.name}
            power={move.power}
            color={move.color}
            onClick={() => props.collect(i)}
            onHover={() => onHover(move)}
            onUnhover={() => onUnhover(move)}
          />
        </>
      )
    })
    const alt = "Hover over a move to view description";
    return (
      <>
        <h1>Choose a move to swap out:</h1>
        {currentMoves}
        <MoveButton
            key={3}
            name={props.lootData.name}
            power={props.lootData.power}
            color={props.lootData.color}
            onClick={() => props.collect(-1)}
            onHover={() => onHover(move)}
            onUnhover={() => onUnhover(move)}
          />
        <h2>{desc ? `[PWR: ${Math.floor(desc.power)}] [ACC: ${Math.floor(desc.accuracy)}%]\n${desc.description}` : alt}</h2>
      </>
    )
  }
  
  return (
    // equipment
    <div className="u-flexColumn u-flex-alignCenter bg">
      <h3>Loot Found:</h3>
      <p className="attribute">Red: {props.lootData.red}</p>
      <p className="attribute">Green: {props.lootData.green}</p>
      <p className="attribute">Blue: {props.lootData.blue}</p>
      <button className="button3 bg" onClick={() => props.collectLoot(null)}>Collect</button>
    </div>
  )
}