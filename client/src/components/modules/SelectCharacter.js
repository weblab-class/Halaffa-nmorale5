import React from 'react';
import { Link } from "@reach/router";

export default function SelectCharacter(props) {
  function finalFunction() {
    return props.onClickChoose(props.starter.id);
  }
  return (
    <div>
      <button onClick={finalFunction}>
        {props.name}
      </button>
      <p>
        HP: {props.starter.health}, Attack: {props.starter.attack}, Speed: {props.starter.speed}, 
        Red: {props.starter.red}, Green: {props.starter.green}, Blue: {props.starter.blue}
      </p>
    </div>
  )
}