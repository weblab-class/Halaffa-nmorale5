import React from 'react';
import "../../utilities.css";

export default class GalleryStarterEntry extends React.Component {
  render() {
    return (
      <div>
        <img
          className="sprite"
          src={require('../../images/' + this.props.starter.sprite).default}
        />
        <p>Name: {this.props.starter.name}</p>
        <p>HP: {this.props.starter.health} Attack: {this.props.starter.attack} Speed: {this.props.starter.speed}</p>
        <p>Red: {this.props.starter.red} Blue: {this.props.starter.blue} Green: {this.props.starter.green}</p>
      </div>
    )
  }
}