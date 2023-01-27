import React from 'react';
import SelectButton from './SelectButton';
import "../../utilities.css"

export default class SelectButtons extends React.Component {
  render() {
    return (
      <div className="u-flexColumn u-flexGrow">
        <SelectButton 
          link="/game" 
          buttonName="Play"
          onHover={this.props.onHover}
          onUnhover={this.props.onUnhover}
        />
        <SelectButton
          link="/leaderboard"
          buttonName="Leaderboard"
          onHover={this.props.onHover}
          onUnhover={this.props.onUnhover}
        />
        <SelectButton
          link="/shop"
          buttonName="Shop"
          onHover={this.props.onHover}
          onUnhover={this.props.onUnhover}
        />
        <SelectButton
          link="/gallery"
          buttonName="Gallery"
          onHover={this.props.onHover}
          onUnhover={this.props.onUnhover}
        />
      </div>
    )
  }
}