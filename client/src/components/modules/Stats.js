import React, { useState } from 'react';
import "../../utilities.css";

function EquipmentIcon(props) {
  return (
    <img
      onMouseOver={props.onHover}
      onMouseOut={props.onUnhover}
      className="sprite"
      src={require('../../images/' + props.sprite).default}
    />
  )
}

function EquipmentDescription(props) {
  return (
    <>
      <h3>{props.equipment.name}</h3>
      <p>{props.equipment.description}</p>
    </>
  )
}

export default function Stats(props) {
  const [description, setDescription] = useState(null)
  const equipmentList = props.stats.equipment.map((equipmentId) => {
    const eq = props.attributes.equipment.find(({id}) => id === equipmentId)
    return (
      <EquipmentIcon
        key={equipmentId}
        name={eq.name}
        sprite={eq.sprite}
        onHover={() => setDescription(equipmentId)}
        onUnhover={() => setDescription(null)}
      />
    )
  })
  const equipment = props.attributes.equipment.find(({id}) => id === description)
  const hoverDisplay = equipment && (
    <EquipmentDescription
      equipment={equipment}
    />
  )
    
  return (
    <>
      <h3>Stats:</h3>
      <ul>
        <li>Attack: {props.stats.attack}</li>
        <li>Health: {props.stats.health}</li>
        <li>Speed: {props.stats.speed}</li>
        <li>XP: {props.stats.xp}</li>
        <li>Red: {props.stats.red}</li>
        <li>Green: {props.stats.green}</li>
        <li>Blue: {props.stats.blue}</li>
      </ul>
      <h3>Icons:</h3>
      <div>
        {equipmentList}
      </div>
      <div>
        {hoverDisplay}
      </div>
    </>
  )
}