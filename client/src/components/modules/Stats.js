import React, { useState } from 'react';
import "../../utilities.css";
import "./Stats.css";

function EquipmentIcon(props) {
  return (
    <img
      onMouseOver={props.onHover}
      onMouseOut={props.onUnhover}
      className="equip u-xsMargin"
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
  const equipmentList = props.stats.equipment.map((equipmentId, i) => {
    const eq = props.attributes.equipment.find(({id}) => id === equipmentId)
    return (
      <EquipmentIcon
        key={i}
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
    <div>
      <div className="divider">
      </div>
      <div className="u-flexRow">
        <div className="u-sMargin statContainer">
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
        </div>
        <div className="u-sMargin">
          <h3>Equipment:</h3>
          <div className="equipContainer">
            {equipmentList}
          </div>
          <div>
            {hoverDisplay}
          </div>
        </div>
      </div>
    </div>
  )
}