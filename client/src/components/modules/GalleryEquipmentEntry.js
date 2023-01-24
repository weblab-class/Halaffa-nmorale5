import React from 'react';
import "../../utilities.css";

export default class GalleryEquipmentEntry extends React.Component {
  render() {
    return (
      <div>
        <img
          className="sprite"
          src={require('../../images/' + this.props.equipment.sprite).default}
        />
        <p>Name: {this.props.equipment.name}</p>
        <p>Effect: {this.props.equipment.description}</p>
        <p>Red: {this.props.equipment.red} Blue: {this.props.equipment.blue} Green: {this.props.equipment.green}</p>
      </div>
    )
  }
}