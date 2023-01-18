import React from 'react';

export default function MoveButton(props) {
  return (
    <button
      onClick={() => props.onClick(props.moveId)}
      onMouseOver={() => props.onHover(props.moveId)}
      onMouseOut={() => props.onUnhover(props.moveId)}
    >
      {props.name} (Power: {props.power})
    </button>
  )
}