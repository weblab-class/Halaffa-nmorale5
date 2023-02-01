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
            <li>ATK: {props.stats.attack}</li>
            <li>SPD: {props.stats.speed}</li>
            <li>RED: {props.stats.red}</li>
            <li>GRN: {props.stats.green}</li>
            <li>BLU: {props.stats.blue}</li>
            <li>HP: {props.stats.health}</li>
          </ul>
        </div>
        <div className="u-sMargin">
          <h3>Equipment:</h3>
          <div className="equipContainer">
            {equipmentList}
          </div>
        </div>
        <div className="Stat-hoverDisplay">
          {hoverDisplay}
        </div> 
      </div>
    </div>
  )
}