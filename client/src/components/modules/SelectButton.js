import React from 'react';
import { Link } from "@reach/router";
import "../../utilities.css";
import "./SelectButton.css";


export default function SelectButton(props) {
  return (
    <div>
      <Link to={props.link} className="removeLine">
        <p className="currencyEntryLink">
            {props.buttonName}
        </p>
      </Link>
      <div className="currencyDivider">

      </div>
    </div>
  )
}