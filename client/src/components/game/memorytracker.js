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
            // console.log('div->', div);
            // console.log('target->', target);
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
        let board = this.props.game.memory[index].board;
        let remainingMoves = this.props.game.memory[index].moves;
        console.log('Current board ->', board);
        console.log('Current moves ->', remainingMoves);
        this.props.getFullMemory(this.props.game.memory[index]);
        console.log('Fullmoves board ->', this.props.game.board);
        console.log('Fullmove moves', this.props.game.moves);
        let boardArray = board.split("");
        for (let j = 0; j < boardArray.length; j++) {
            let b = document.getElementById(index + "btn" + j);
            if (b !== null) {
                b.innerHTML = boardArray[j] === "B" ? '<img class="pawnblack" src="pawnblack.png">' : boardArray[j] === "W" ? '<img class="pawnwhite" src="pawnwhite.png">' : " ";
            }
        }
    };

    render() {
        return (
            <div id="memory-tracker">
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