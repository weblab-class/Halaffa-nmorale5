import React from "react";
import { Link } from "@reach/router";
import CurrencyUI from "./CurrencyUI";
import Character from "../modules/Character";

export default class Shop extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CurrencyUI currency={this.props.currency} userId={this.props.userId}/>
        <button>
          <Link to="/select">
              Back
          </Link>
        </button>
        <Character onClickChoose = {this.props.onClickChoose}/>
      </div>
    )
  }
}