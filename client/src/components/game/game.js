import React from 'react';
import Board from './board.js';
import initialiseChessBoard from '../helpers/board-initialiser.js';
import './game.css';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: initialiseChessBoard(),
      player: 1,
      sourceSelection: -1,
      turn: 'white'
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.state.sourceSelection === -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        // squares[i] ? delete squares[i].style.backgroundColor : null;
      }
      else {
        squares[i].style = { ...squares[i].style, backgroundColor: "RGB(111,143,114)" };
        this.setState({
          sourceSelection: i
        });
      }
    }
    else if (this.state.sourceSelection > -1) {
      // delete squares[this.state.sourceSelection].style.backgroundColor;
      if (squares[i] && squares[i].player === this.state.player) {
        this.setState({
          sourceSelection: -1,
        });
      }
      else {
        const squares = this.state.squares.slice();
        const isDestEnemyOccupied = squares[i] ? true : false;
        const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
        const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
        const isMoveLegal = this.isMoveLegal(srcToDestPath);

        if (isMovePossible && isMoveLegal) {
          squares[i] = squares[this.state.sourceSelection];
          squares[this.state.sourceSelection] = null;
          let player = this.state.player === 1 ? 2 : 1;
          let turn = this.state.turn === 'white' ? 'black' : 'white';
          this.setState({
            sourceSelection: -1,
            squares: squares,
            player: player,
            turn: turn
          });
        }
        else {
          this.setState({
            sourceSelection: -1,
          });
        }
      }
    }
  }

  isMoveLegal(srcToDestPath) {
    let isLegal = true;
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (this.state.squares[srcToDestPath[i]] !== null) {
        isLegal = false;
      }
    }
    return isLegal;
  }

  render() {
    return (
      <div id="hexa" className="col s6 blue" style={{ minHeight: "88vh", paddingTop: "50px" }}>
          <Board
            squares={this.state.squares}
            onClick={(i) => this.handleClick(i)}
          />
      </div>
    );
  }
}

