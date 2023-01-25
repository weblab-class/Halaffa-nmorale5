import React from 'react';
import SelectButton from './SelectButton';

export default class SelectButtons extends React.Component {
  render() {
    return (
      <div>
        <SelectButton link="/game" buttonName="Single Player" onHover={this.props.onHover} onUnhover={this.props.onUnhover}/>
        <SelectButton link="/game" buttonName="Multiplayer" onHover={this.props.onHover} onUnhover={this.props.onUnhover}/>
        <SelectButton link="/leaderboard" buttonName="Leaderboard" onHover={this.props.onHover} onUnhover={this.props.onUnhover}/>
        <SelectButton link="/shop" buttonName="Shop" onHover={this.props.onHover} onUnhover={this.props.onUnhover}/>
        <SelectButton link="/gallery" buttonName="Gallery" onHover={this.props.onHover} onUnhover={this.props.onUnhover}/>
      </div>
    )
  }
}