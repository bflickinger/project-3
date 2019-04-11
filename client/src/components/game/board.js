import React from 'react';
import Square from './square.js';
import './game.css';

export default class Board extends React.Component {

  isEven = (num) => {
    return num % 2 === 0
  }

  renderSquare(i, squareShade) {
    return <Square
      style={this.props.squares[i] ? this.props.squares[i].style : null}
      shade={squareShade}
      onClick={() => this.props.onClick(i)}
    />
  }

  render() {
    const board = [];
    for (let i = 0; i < 3; i++) {
      const squareRows = [];
      for (let j = 0; j < 3; j++) {
        const squareShade = (this.isEven(i) && this.isEven(j)) || (!this.isEven(i) && !this.isEven(j)) ? "light-square" : "dark-square";
        squareRows.push(this.renderSquare((i * 3) + j, squareShade));
      }
      board.push(<div className="board-row">{squareRows}</div>)
    }

    return (
      <div className="board">
        {board}
      </div>
    );
  }
}