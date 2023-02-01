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
  const data = props.option.color ? (
    // Display a move
    <>

    </>
  ) : (
    // Display an equipment
    <>
      <p className="attribute">Red: {props.option.red}</p>
      <p className="attribute">Green: {props.option.green}</p>
      <p className="attribute">Blue: {props.option.blue}</p>
    </>
  );
  return (
    <div className={"u-flexColumn u-mMargin u-flex-alignCenter " + color}>
      <h3>Difficulty: {["Easy", "Medium", "Hard"][props.option.tier - 1]}</h3>
      {data}
      <button className={"buttonS button2 " + color} onClick={props.onClick}>Fight</button>
    </div>
  )
}