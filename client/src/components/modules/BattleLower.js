import React from 'react';
import MoveSelect from './MoveSelect';

export default class BattleLower extends React.Component {
  render() {
    return (
      <MoveSelect 
        attributes={this.props.attributes}
        gameData={this.props.gameData}
        player={this.props.player}
        enemy={this.props.enemy}
        onClickMove={this.props.onClickMove}
      />
    )
  }
}