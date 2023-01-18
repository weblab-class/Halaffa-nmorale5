import React from 'react';
import MoveButton from './MoveButton';

export default class MoveSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleDescription: null,
    };
  }

  onHover(moveId) {
    this.setState({ visibleDescription: moveId });
  }

  onUnhover(moveId) {
    this.setState({ visibleDescription: null });
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
            onHover={(moveId) => this.onHover(moveId)}
            onUnhover={(moveId) => this.onUnhover(moveId)}
          />
        </li>
      )
    })

    const move = this.props.attributes.moves.find(({id}) => id === this.state.visibleDescription);
    const alt = "Hover over a move to view description";

    return (
      <>
        <ul>
          {moveList}
        </ul>
        <p>{move ? move.description : alt}</p>
      </>
    )
  }
}