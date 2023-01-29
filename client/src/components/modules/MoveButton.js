import React from 'react';
import "../../utilities.css";

export default function MoveButton(props) {
  let color = "buttonGreen";
  if (props.color == "red") {
    color = "buttonRed";
  }
  else if (props.color == "blue") {
    color = "buttonBlue";
  }
  return (
    <button className = {"buttonS bg " + color}
      onClick={props.onClick}
      onMouseOver={props.onHover}
      onMouseOut={props.onUnhover}
    >
      {props.name}
    </button>
  )
}