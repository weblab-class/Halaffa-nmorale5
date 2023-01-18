import React from "react";

export default class CurrencyUI extends React.Component {
  constructor(props) {
    super(props);
  } 
  render() {
    return (
      <p>
        $: {this.props.currency} user: {this.props.userId}
      </p>
    )
  }
}