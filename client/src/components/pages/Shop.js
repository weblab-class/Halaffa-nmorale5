import React from "react";
import { Link } from "@reach/router";
import CurrencyUI from "./CurrencyUI";
import Character from "../modules/Character";

export default class Shop extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const starterList = this.props.starters
    return (
      <div>
        <CurrencyUI currency={this.props.currency} userId={this.props.userId}/>
        <button>
          <Link to="/select">
              Back
          </Link>
        </button>
        {starterList.map((starter) => (
          <Character
            onClickChoose = {this.props.onClickChoose}
            name={starter.name}
            starterId={starter.id}
            sprite={starter.sprite}
            key={starter.id}
          />
        ))}
      </div>
    )
  }
}