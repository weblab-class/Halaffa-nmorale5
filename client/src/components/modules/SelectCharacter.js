import React from 'react';
import { Link } from "@reach/router";

export default function SelectCharacter(props) {
  function finalFunction() {
    return props.onClickChoose(props.starterId);
  }
  return (
    <button onClick={finalFunction}>
      {props.name}
    </button>
  )
}