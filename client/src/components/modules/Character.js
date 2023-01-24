import React from 'react';
import SelectCharacter from "./SelectCharacter.js";
import "../../utilities.css";

export default class Character extends React.Component {
  render() {
    let onClickFunc = this.props.onClickBuy;
    let buttonName = "Unlock for: " + this.props.starter.cost;
    if (this.props.isUnlocked) {
      onClickFunc = this.props.onClickChoose;
      buttonName = this.props.starter.name;
    }
    return (
      <div>
        <img
          className="sprite"
          src={require('../../images/' + this.props.starter.sprite).default}
        />
        <SelectCharacter 
          onClickChoose = {onClickFunc}
          starter ={this.props.starter} 
          name = {buttonName}
        />
      </div>
    )
  }
}