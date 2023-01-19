import React from 'react';
import SelectCharacter from "./SelectCharacter.js";

export default class Character extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log
    return (
      <div>
        <img
          src={console.log(('../../images/' + this.props.sprite).default)}
        />
        <SelectCharacter 
          onClickChoose = {this.props.onClickChoose} 
          starterId ={this.props.starterId} 
          name = {this.props.name}
        />
      </div>
    )
  }
}