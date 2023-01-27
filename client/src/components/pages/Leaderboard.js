import React from "react";
import { Link } from "@reach/router";
import WinLose from "../modules/WinLose.js";


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
        <WinLose win={true} onWin={this.props.onWin} addCurrency={this.props.addCurrency}>
        </WinLose>
      </div>
    )
  }
}