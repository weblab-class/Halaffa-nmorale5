import React from 'react';
import "./Timer.css";

export default function Timer(props) {
  if (props.timer){
    return (
      <div className="Timer">Time Left: {props.timer}</div>
    )
  }
  return null;
}