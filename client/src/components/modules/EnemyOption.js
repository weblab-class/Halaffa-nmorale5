import React from 'react';

export default function EnemyOption(props) {
  return (
    <>
      <h3>Difficulty: {props.option.difficulty}</h3>
      <ul onClick={props.onClick}>
        <li>XP: {props.option.xp}</li>
        <li>Red: {props.option.red}</li>
        <li>Green: {props.option.green}</li>
        <li>Blue: {props.option.blue}</li>
      </ul>
    </>
  )
}