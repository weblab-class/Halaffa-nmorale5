import React from 'react';
import "./SelectText.css";

export default class SelectText extends React.Component {
  render() {
    return (
      <div className="selectText">
        <p>{this.props.text}</p>
      </div>
    )
  }
}