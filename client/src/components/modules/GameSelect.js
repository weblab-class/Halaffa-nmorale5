import React from 'react';

export default function GameSelect(props) {
  return (
    <>
      <h1>
        Single Player:
      </h1>
      <button onClick={() => props.startQueue("endless")}>
        Endless
      </button>
      <h1>
        Multiplayer:
      </h1>
      <button onClick={() => props.startQueue("classic")}>
        Classic
      </button>
      <button onClick={() => props.startQueue("draft")}>
        Draft
      </button>
    </>
  )
}