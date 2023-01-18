import React from 'react';
import { Link } from "@reach/router";

export default function SelectButton(props) {
  return (
    <button>
      <Link to={props.link}>
          {props.text}
      </Link>
    </button>
  )
}