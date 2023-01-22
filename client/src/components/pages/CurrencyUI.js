import React from "react";

export default class CurrencyUI extends React.Component {
  constructor(props) {
    super(props);
  } 
  render() {
    return (
      <p>
        $: {this.props.currency} User: {this.props.userName}
      </p>
    )
  }
}