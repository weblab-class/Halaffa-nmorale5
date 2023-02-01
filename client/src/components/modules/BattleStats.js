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

export default function BattleStats(props) {
  const [eqDisplay, setEqDisplay] = useState(null)
  const playerEquipment = props.player.equipment.map((eq, i) => {
    return (
      <EquipmentIcon
        key={i}
        name={eq.name}
        sprite={eq.sprite}
        onHover={() => setEqDisplay(eq)}
        onUnhover={() => setEqDisplay(null)}
      />
    )
  });
  const enemyEquipment = props.enemy.equipment.map((eq, i) => {
    return (
      <EquipmentIcon
        key={i}
        name={eq.name}
        sprite={eq.sprite}
        onHover={() => setEqDisplay(eq)}
        onUnhover={() => setEqDisplay(null)}
      />
    )
  });
  const hoverDisplay = eqDisplay && (
    <EquipmentDescription
      equipment={eqDisplay}
    />
  );
  return (
    <div>
      <div className="divider">
      </div>
      <div className="u-flexRow">
        <div className="u-sMargin statContainer">
          <h3>Stats:</h3>
          <ul>
            <li>ATK: {props.player.attack}</li>
            <li>SPD: {props.player.speed}</li>
            {/* <li>XP: {props.player.xp}</li> */}
            <li>RED: {props.player.red}</li>
            <li>GRN: {props.player.green}</li>
            <li>BLU: {props.player.blue}</li>
          </ul>
        </div>
        <div className="u-sMargin">
          <h3>Equipment:</h3>
          <div className="equipContainer">
            {playerEquipment}
          </div>
          <div className="equipContainer">
            {enemyEquipment}
          </div>
        </div>
        <div className="Stat-hoverDisplay">
          {hoverDisplay}
        </div> 
      </div>
    </div>
  )
}