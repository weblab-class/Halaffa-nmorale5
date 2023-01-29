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
    const game = this.props.battleData;
    const moveList = game[this.props.players[0]].moves.map((moveId) => {
      const move = this.props.attributes.moves.find(({id}) => id === moveId);
      return (
        <MoveButton
          name={move.name}
          power={move.power}
          color={move.color}
          onClick={() => this.props.makeMove(moveId)}
          onHover={() => this.onHover(moveId)}
          onUnhover={() => this.onUnhover(moveId)}
        />
      )
    })

    const move = this.props.attributes.moves.find(({id}) => id === this.state.visibleDescription);
    const alt = "Hover over a move to view description";

    return (
      <>
        <div className="u-flexColumn">
          {moveList}
        </div>

        <p>{move ? "(Power: " + move.power + ")  " + move.description : alt}</p>
      </>
    )
  }
}