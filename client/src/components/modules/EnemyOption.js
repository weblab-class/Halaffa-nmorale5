import React from 'react';
import "./EnemyOption.css";

export default function EnemyOption(props) {
  let color = "greenbg";
  if (props.option.difficulty == "Medium") {
    color = "yellowbg";
  }
  else if (props.option.difficulty == "Hard") {
    color = "redbg"
  }
  return (
    <div className={"u-flexColumn u-mMargin u-flex-alignCenter " + color}>
      <h3>Difficulty: {props.option.difficulty}</h3>
      <p className="attribute">XP: {props.option.xp}</p>
      <p className="attribute">Red: {props.option.red}</p>
      <p className="attribute">Green: {props.option.green}</p>
      <p className="attribute">Blue: {props.option.blue}</p>
      <button className={"buttonS button2 " + color} onClick={props.onClick}>Fight</button>
    </div>
  )
}