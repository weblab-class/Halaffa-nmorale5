import React from 'react';
import SelectCharacter from "./SelectCharacter.js";

export default class Character extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <img
          className='sprite'
          src={require('../../images/' + "WaterStarter.png").default}
        />
        <SelectCharacter onClickChoose = {this.props.onClickChoose} starterId = {0} name = "Alice"/>
      </div>
    )
  }
}