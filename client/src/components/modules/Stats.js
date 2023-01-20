import React from 'react';

export default function Stats(props) {
  return (
    <>
      <h3>Stats:</h3>
      <ul>
        <li>Attack: {props.stats.attack}</li>
        <li>Health: {props.stats.health}</li>
        <li>Speed: {props.stats.speed}</li>
        <li>XP: {props.stats.xp}</li>
        <li>Red: {props.stats.red}</li>
        <li>Green: {props.stats.green}</li>
        <li>Blue: {props.stats.blue}</li>
      </ul>
    </>
  )
}