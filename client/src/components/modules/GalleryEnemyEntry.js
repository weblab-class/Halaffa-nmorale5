import React from 'react';
import "../../utilities.css";

export default class GalleryEnemyEntry extends React.Component {
  render() {
    return (
      <div>
        <img
          className="sprite"
          src={require('../../images/' + this.props.enemy.sprite).default}
        />
        <p>Name: {this.props.enemy.name}</p>
        <p>HP: {this.props.enemy.health} Attack: {this.props.enemy.attack} Speed: {this.props.enemy.speed}</p>
        <p>Red: {this.props.enemy.red} Blue: {this.props.enemy.blue} Green: {this.props.enemy.green}</p>
      </div>
    )
  }
}