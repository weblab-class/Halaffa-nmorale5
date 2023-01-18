import React from 'react';
import MoveButton from './MoveButton';

export default class MoveSelect extends React.Component {
  constructor(props) {
    super(props);
    // TODO display description based on hover
  }

  render() {
    const moveList = this.props.gameData.moves.map((moveId) => {
      const move = this.props.attributes.moves.find(({id}) => id === moveId);
      return (
        <li key={moveId}>
          <MoveButton
            moveId={moveId}
            name={move.name}
            power={move.power}
            onClick={this.props.onClickMove}
          />
        </li>
      )
    })

    return (
      <ul>
        {moveList}
      </ul>
    )
  }
}