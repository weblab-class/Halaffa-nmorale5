import React from "react";
import { Link } from "@reach/router";
import CurrencyUI from "./CurrencyUI";
import Character from "../modules/Character";

export default class Shop extends React.Component {
  render() {
    const starterList = this.props.starters
    return (
      <div>
        <CurrencyUI currency={this.props.currency} userName={this.props.userName}/>
        <button>
          <Link to="/select">
              Back
          </Link>
        </button>
        <div className="u-flex">
          {starterList.map((starter) => (
            <Character
              onClickChoose = {this.props.onClickChoose}
              onClickBuy = {this.props.onClickBuy}
              starter = {starter}
              isUnlocked = {this.props.unlockedStarters[starter.id]}
              key={starter.id}
            />
          ))}
        </div>
      </div>
    )
  }
}