import React from 'react';
import "../../utilities.css";
import { Link } from "@reach/router";
import { get, post } from "../../utilities";

/* 
Props: props.game (contains all information about the game)
props.onWin (addWin function from App.js)
props.addCurrency (addCurrency function from App.js)
*/

export default function GameOver(props) {
  let text = "You lost.";
  let currency = 10;
  if (props.game.screen == "win") {
    text = "You won!";
    currency = 20;
  }
  if (props.game.screen == "end") {
    text = "You made it to floor " + props.game.floor + "!";
    currency = props.game.floor * 2;
  }
  function combinedOps() {
    if (props.game.screen == "win") {
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