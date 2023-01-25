import React from 'react';
import { Link } from "@reach/router";
import "../../utilities.css";

export default function SelectCharacter(props) {
  function finalFunction() {
    return props.onClickChoose(props.starter.id);
  }
  return (
    <div>
      <button onClick={finalFunction} className="u-flex-alignCenter">
        {props.name}
      </button>
      <div className="u-flexRow">
        <div className="u-flexColumn u-xsMargin">
          <p>HP: {props.starter.health}</p>
          <p>Attack: {props.starter.attack}</p>
          <p>Speed: {props.starter.speed} </p>
        </div>
        <div className="u-flexColumn u-xsMargin">
          <p>Red: {props.starter.red}</p>
          <p>Green: {props.starter.green}</p>
          <p>Blue: {props.starter.blue}</p>
        </div>
      </div>
    </div>
  )
}