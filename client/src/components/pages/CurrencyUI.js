import React from "react";
import "../../utilities.css";
import "./CurrencyUI.css";



export default class CurrencyUI extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="u-flexRow currencyUI u-flexGrow u-flex-justifyCenter">
        <h1 className="currencyEntry">
          $: {this.props.currency}
        </h1>
        
        <h1 className="currencyEntry">
          User: {this.props.userName}
        </h1>
      </div>
    )
  }
}