import React from "react";
import { Link } from "@reach/router";
import GameOver from "../modules/GameOver.js";


export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link to="/select">
          <button>
              Back
          </button>
        </Link>
        <button onClick={this.props.debug}>
          Debug
        </button>
        <h1>
          Wins: {this.props.numWins}
        </h1>
        <GameOver win={true} onWin={this.props.onWin} addCurrency={this.props.addCurrency}>
        </GameOver>
      </div>
    )
  }
}