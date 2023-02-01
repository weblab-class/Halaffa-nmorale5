import React from 'react';
import "./EnemyOption.css";

export default function EnemyOption(props) {
  let color = "greenbg";
  if (props.option.tier == 2) {
    color = "yellowbg";
  }
  else if (props.option.tier == 3) {
    color = "redbg"
  }
  let name = "buttonGreen";
  if (props.option.color == "blue"){
    name = "buttonBlue";
  }
  if (props.option.color == "red"){
    name = "buttonRed";
  }
  const data = props.option.color ? (
    // Display a move
    <div className="u-flexRow">
      <button className={color + " buttonS u-mMargin " + name}>
        {props.option.name}
      </button>
      <p className="Option-desc">{props.option.description}</p>
    </div>
  ) : (
    // Display an equipment
    <div className="u-flexRow">
      <img 
        className="equip u-mMargin"
        src={require('../../images/' + props.option.sprite).default}
      />
      <div className="Option-desc">{props.option.description}</div>
      <div className="u-flexColumn">
        <div className="attribute">ATK: {props.option.attack}</div>
        <div className="attribute">HP: {props.option.health}</div>
        <div className="attribute">SPD: {props.option.speed}</div>
        <div className="attribute">RED: {props.option.red}</div>
        <div className="attribute">GRN: {props.option.green}</div>
        <div className="attribute">BLU: {props.option.blue}</div>
      </div>
    </div>
  );
  return (
    <div className={"u-flexColumn u-mMargin u-flex-alignCenter " + color}>
      <h3>Difficulty: {["Easy", "Medium", "Hard"][props.option.tier - 1]}</h3>
      {data}
      <button className={"buttonS button2 " + color} onClick={props.onClick}>Fight</button>
    </div>
  )
}