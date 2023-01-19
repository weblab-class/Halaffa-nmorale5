import React from 'react';

export default function MoveButton(props) {
  return (
    <button
      onClick={props.onClick}
      onMouseOver={props.onHover}
      onMouseOut={props.onUnhover}
    >
      {props.name} (Power: {props.power})
    </button>
  )
}