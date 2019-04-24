import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isArray } from "util";
import "./style.css";

class Memorytracker extends Component {

    drawTracker = (index) => {
        this.createBtns(index);
    }

    createBtns = (index) => {
        if (!document.getElementById(index)) {
            let b, d = document.createElement("div"), v = false, x = document.getElementById("memory-tracker");
            d.className += "small-board";
            d.id = index;
            x.appendChild(d);
            for (let j = 0; j < 3; j++) {
                for (let i = 0; i < 3; i++) {
                    b = document.createElement("button");
                    b.id = index + "btn" + (i + j * 3);
                    b.i = i; b.j = j;
                    b.addEventListener("click", this.btnHandle, false);
                    b.appendChild(document.createTextNode(""));
                    d.appendChild(b);
                    if (v) b.className = "small-button"
                    else b.className = "small-empty";
                    v = !v;
                }
            }
            this.updateBtns(index)
        }
    }

    updateBtns = (index) => {
        let board = this.props.game.memory[index].board;
        // console.log('Board in Updatebtns ->', board);
        let boardArray = board.split("");
        for (let j = 0; j < boardArray.length; j++) {
            // console.log('boardArray ->', boardArray[j]);
            let b = document.getElementById(index + "btn" + j);
            // console.log("button" , index + "btn" + j, b);
            if (b !== null) {
                // console.log('not null', b);
                b.innerHTML = boardArray[j] === "B" ? "&#x265F;" : boardArray[j] === "W" ? "&#x2659;" : " ";
            }
        }
    };

    render() {
        return (
            <div id="memory-tracker">
                {isArray(this.props.gameprops.memory) ? this.props.gameprops.memory.map((memory, index) => (
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
    mapStateToProps
)(Memorytracker);