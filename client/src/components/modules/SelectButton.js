import React from 'react';
import { Link } from "@reach/router";
import "../../utilities.css";


export default function SelectButton(props) {
  return (
    <div>
      <Link to={props.link}>
        <button
          onMouseOver={() => props.onHover(props.buttonName)}
          onMouseOut={() => props.onUnhover(props.buttonName)}
          >
            {props.buttonName}
        </button>
      </Link>
    </div>
  )
}