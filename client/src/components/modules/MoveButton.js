import React from 'react';

export default function MoveButton(props) {
  return (
    <button
      onClick={() => props.onClick(props.moveId)}
    >
      {props.name} (Power: {props.power})
    </button>
  )
}