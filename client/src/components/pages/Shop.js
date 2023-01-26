import React from "react";
import { Link } from "@reach/router";
import CurrencyUI from "./CurrencyUI";
import Character from "../modules/Character";
import "../../utilities.css";
import"./Shop.css";

export default class Shop extends React.Component {
  render() {
    const starterList = this.props.starters
    return (
      <div>
        <CurrencyUI currency={this.props.currency} userName={this.props.userName}/>
        <div>
          <Link to="/select">
            <button>
              Back
            </button>
          </Link>
          <div className="u-flex u-flexWrap">
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
      </div>
    )
  }
}