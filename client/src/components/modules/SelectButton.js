import React from 'react';
import { Link } from "@reach/router";

export default function SelectButton(props) {
  return (
    <button 
      onMouseOver={() => props.onHover(props.buttonName)}
      onMouseOut={() => props.onUnhover(props.buttonName)}>
      <Link to={props.link}>
          {props.buttonName}
      </Link>
    </button>
  )
}