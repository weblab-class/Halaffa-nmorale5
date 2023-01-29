import React from 'react';
import "../../utilities.css";
import { Link } from "@reach/router";
import { get, post } from "../../utilities";

/* 
Props: props.win (boolean if you won)
props.onWin (addWin function from App.js)
props.addCurrency (addCurrency function from App.js)
*/

export default function WinLose(props) {
  let text = "You lost.";
  let currency = 10;
  if (props.win) {
    text = "You won!"
    currency = 20;
  }
  function combinedOps() {
    if (props.win) {
      props.onWin();
    }
    props.addCurrency(currency);
    props.endGame();
  }
  
  return (
    <div className="u-flexColumn u-flex-justifyCenter">
      <h1>
        {text}
      </h1>
      <p>
        You earned: {currency}
      </p>
      <Link to="/select">
        <button onClick={combinedOps}>
          Return to Profile
        </button>
      </Link>
    </div>
  )
}