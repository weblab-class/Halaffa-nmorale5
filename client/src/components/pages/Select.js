import React from "react";
import SelectButtons from "../modules/SelectButtons.js";
import SelectText from "../modules/SelectText.js";
import CurrencyUI from "./CurrencyUI.js";


export default class Select extends React.Component {
  constructor(props) {
    super(props);
  } 
  render() {
    return (
      <div>
        <CurrencyUI currency={this.props.currency} userId={this.props.userId}/>
        <SelectButtons/>
        <SelectText/>
      </div>
    )
  }
}