import React from 'react';
import MoveButton from './MoveButton';

export default class MoveSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleDescription: null,
    };
  }

  onHover(moveIdx) {
    this.setState({ visibleDescription: moveIdx });
  }

  onUnhover(moveIdx) {
    this.setState({ visibleDescription: null });
  }

  render() {
    const game = this.props.battleData;
    const moveList = game[this.props.players[0]].moves.map((move, i) => {
      return (
        <MoveButton
          key={i}
          name={move.name}
          power={move.power}
          color={move.color}
          onClick={() => this.props.makeMove(i)}
          onHover={() => this.onHover(i)}
          onUnhover={() => this.onUnhover(i)}
        />
      )
    })

    const move = game[this.props.players[0]].moves[this.state.visibleDescription];
    const alt = "Hover over a move to view description";

    return (
      <>
        <div className="u-flexRow">
          {moveList}
        </div>

        <p>{move ? `[PWR: ${move.power}] [ACC: ${move.accuracy}%]\n${move.description}` : alt}</p>
      </>
    )
  }
}