import React from "react";
import CurrencyUI from "./CurrencyUI.js";
import { Link } from "@reach/router";
import GameOver from "../modules/GameOver.js";


export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <CurrencyUI currency={this.props.currency} userName={this.props.userName} userStarter={this.props.userStarter}/>
        <button onClick={this.props.debug}>
          Debug
        </button>
        <h1>
          Wins: {this.props.numWins}
        </h1>
      </div>
    )
  }
}