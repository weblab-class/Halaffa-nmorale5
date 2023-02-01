import React, { useState } from 'react';
import MoveButton from "./MoveButton.js";
import "./LootResult.css";

export default function LootResults(props) {
  if (props.lootData.color && props.moves.length >= 4) {
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
            onClick={() => props.collectLoot(i)}
            onHover={() => onHover(move)}
            onUnhover={() => onUnhover(move)}
          />
        </>
      )
    })
    const alt = "Hover over a move to view description";
    return (
      <>
        <h1>You unlocked a new move!</h1>
        <p>You reached the move limit. Choose one to swap out:</p>
        {currentMoves}
        <MoveButton
            key={3}
            name={props.lootData.name}
            power={props.lootData.power}
            color={props.lootData.color}
            onClick={() => props.collectLoot(-1)}
            onHover={() => onHover(props.lootData)}
            onUnhover={() => onUnhover(props.lootData)}
          />
        <p>{desc ? `[PWR: ${Math.floor(desc.power)}] [ACC: ${Math.floor(desc.accuracy)}%]\n${desc.description}` : alt}</p>
      </>
    )
  }
  if (props.lootData.color) {
    return (
      <>
        <h1>You unlocked a new move!</h1>
        <p>{props.lootData.name}</p>
        <button className="button3 bg" onClick={() => props.collectLoot(null)}>Collect</button>
      </>
    )
  }
  
  return (
    // equipment
    <div className="u-flexColumn u-flex-alignCenter bg">
      <h3>You unlocked a new equipment!</h3>
      <p className="attribute">Red: +{props.lootData.red}</p>
      <p className="attribute">Green: +{props.lootData.green}</p>
      <p className="attribute">Blue: +{props.lootData.blue}</p>
      <p className="attribute">Health: +{props.lootData.health}</p>
      <p className="attribute">Attack: +{props.lootData.attack}</p>
      <p className="attribute">Speed: +{props.lootData.speed}</p>
      <button className="button3 bg" onClick={() => props.collectLoot(null)}>Collect</button>
    </div>
  )
}