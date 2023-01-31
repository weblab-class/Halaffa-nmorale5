import React from 'react';

export function MoveSummary(props) {
  return (
    <>
      {props.text}
    </>
  );
}

export function AwaitingOpponent(props) {
  return (
    <p>Waiting for opponent's move...</p>
  )
}
