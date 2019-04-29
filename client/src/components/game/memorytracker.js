import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isArray } from "util";
import {
    getFullMemory
} from "../../actions/gameActions";
import "./style.css";

class Memorytracker extends Component {

    drawTracker = (index) => {
        this.createBtns(index);
    }

    drawLine = () => {
        let line = document.createElement("svg").setAttribute("width: 300", "height=100")
    }

    createBtns = (index) => {
        if (!document.getElementById(index)) {
            let board, div = document.createElement("div"), v = false, target = document.getElementById("memory-tracker");
            div.className += "small-board";
            div.id = index;
            if (target !== null) {
                target.appendChild(div);
                for (let j = 0; j < 3; j++) {
                    for (let i = 0; i < 3; i++) {
                        board = document.createElement("button");
                        board.id = index + "btn" + (i + j * 3);
                        board.i = i; board.j = j;
                        board.addEventListener("click", this.btnHandle, false);
                        board.appendChild(document.createTextNode(""));
                        div.appendChild(board);
                        if (v) board.className = "small-button"
                        else board.className = "small-empty";
                        v = !v;
                    }
                }
            }
            this.updateBtns(index)
        }
    }

    updateBtns = (index) => {
        let playerBoard = this.props.game.memory[index].board;
        let boardArray = playerBoard.split("");
        for (let j = 0; j < boardArray.length; j++) {
            let b = document.getElementById(index + "btn" + j);
            if (b !== null) {
                b.innerHTML = boardArray[j] === "B" ? '<img class="pawnblack" src="pawnblack.png">' : boardArray[j] === "W" ? '<img class="pawnwhite" src="pawnwhite.png">' : " ";
            }
        }
        this.drawMoves(index)
    };

    drawMoves = (index) => {
        let playerBoard = this.props.game.memory[index].board;
        let playerMoves = this.props.game.memory[index].moves;
        let allBoards = this.props.game.allboards;
        let matchingBoardMoves = [];
        for (let x = 0; x < allBoards.length; x++) {
            if (allBoards[x].board === playerBoard) {
                matchingBoardMoves = allBoards[x].moves;
                break;
            }
        }
        let redMoves = [];
        let blueMoves = [];
        var color = "red";
        var bluemove = '';
        for (let y = 0; y < matchingBoardMoves.length; y++) {
            let mBf = matchingBoardMoves[y].f;
            let mBt = matchingBoardMoves[y].t;
            for (let z = 0; z < playerMoves.length; z++) {
                if ((playerMoves[z].f === mBf) && (playerMoves[z].t === mBt)) {
                    color = "blue";
                    bluemove = "{ 'f': mBf, 't': mBt }";
                } 
            }
            if (color === 'blue') {
                blueMoves.push({ 'f': mBf, 't': mBt });
                color = 'red';
            } else {
                redMoves.push({ 'f': mBf, 't': mBt});
            }
        }
        //create svg append to memory tracker div
    }

    render() {
        return (
            <div id="memory-tracker">
                {/* && isArray(this.props.game.allboards) */}
                {isArray(this.props.game.memory) ? this.props.game.memory.map((memory, index) => (
                    this.drawTracker(index)
                )) : ""}
            </div>
        );
    }
}

Memorytracker.propTypes = {
    game: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    game: state.game
});

export default connect(
    mapStateToProps, {
        getFullMemory
    }
)(Memorytracker);