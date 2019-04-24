import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./style.css";
import { getMemory } from "../../actions/gameActions";

let board;

class Memorytracker extends Component {
  
    componentDidMount = () => {
        this.createBoard();
        this.createBtns();
    }

    createBoard = () => {
        board = new Array(3);
        for (let i = 0; i < 3; i++) {
            board[i] = new Array(3);
        }
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                board[i][j] = j === 0 ? "B" : j === 2 ? "W" : " ";
            }
        }
    };
    
    createBtns = () => {
        let b, d = document.createElement("div"), v = false, x = document.getElementById("memory-tracker");
        d.className += "board2";
        x.appendChild(d);
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                b = document.createElement("button2");
                b.id = "btn" + (i + j * 3);
                b.i = i; b.j = j;
                b.addEventListener("click", this.btnHandle, false);
                b.appendChild(document.createTextNode(""));
                d.appendChild(b);
                if (v) b.className = "button2"
                else b.className = "empty2";
                v = !v;
            }
        }
    }

    updateBtns = () => {
        let b;
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                b = document.getElementById("btn" + (i + j * 3));
                b.innerHTML = board[i][j] === "B" ? "&#x265F;" : board[i][j] === "W" ? "&#x2659;" : " ";
            }
        }
    };

    render() {

        return (
                <div id="memory-tracker">
                    {console.log('Memory Tracker Render props ->', this.props)}
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
    mapStateToProps
)(Memorytracker);