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

    createBtns = (index) => {
        if (!document.getElementById('board' + index)) {
            let board, div = document.createElement("div"), v = false, target = document.getElementById("memory-tracker");
            div.className += "small-board";
            div.id = 'board' + index;
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
            this.updateBtns(index);

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
        this.drawMoves(index);
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
                redMoves.push({ 'f': mBf, 't': mBt });
            }
        }
        //create svg append to memory tracker div
        let arrowEndX, arrowEndY;
        let arrowStartX, arrowStartY, arrowPath;
        let arrowBlue = "stroke:lightseagreen; stroke-width: 8px; fill: none; ";
        let arrowRed = "stroke:red; stroke-width: 8px; fill: none;";

        if (!document.getElementById("svg" + index)) {
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), target = document.getElementById("board" + index);
            var defs = document.createElementNS("http://www.w3.org/2000/svg", 'defs');

            let markerblue = document.createElementNS("http://www.w3.org/2000/svg", 'marker');
            markerblue.setAttribute('id' , 'arrowblue');
            markerblue.setAttribute('markerWidth' , '13');
            markerblue.setAttribute('markerHeight' , '13');
            markerblue.setAttribute('refx' , '2');
            markerblue.setAttribute('refy' , '6');
            markerblue.setAttribute('orient' , 'auto');
            let pathblue = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            pathblue.setAttribute('d', 'M2,1 L2,10 L10,6 L2,2');
            pathblue.setAttribute('style', 'fill:lightseagreen;');
            markerblue.appendChild(pathblue);
            defs.appendChild(markerblue);
    
            let markerred = document.createElementNS("http://www.w3.org/2000/svg", 'marker');
            markerred.setAttribute('id' , 'arrowred');
            markerred.setAttribute('markerWidth' , '13');
            markerred.setAttribute('markerHeight' , '13');
            markerred.setAttribute('refx' , '2');
            markerred.setAttribute('refy' , '6');
            markerred.setAttribute('orient' , 'auto');
            let pathred = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            pathred.setAttribute('d', 'M2,1 L2,10 L10,6 L2,2');
            pathred.setAttribute('style', 'fill:red;');
            markerred.appendChild(pathred);
            defs.appendChild(markerred);


            defs.setAttribute('id', 'defs' + index);
            svg.setAttribute('viewBox', '0 0 330 330');
            svg.setAttribute('id', 'svg' + index);
            svg.appendChild(defs);
            target.prepend(svg);
        }

        for (let x = 0; x < blueMoves.length; x++) {
            let sourceButton = blueMoves[x].f, destinationButton = blueMoves[x].t;
            let svg = document.getElementById('svg' + index);

            console.log('blue source ->' + sourceButton + ' , destination ->' + destinationButton);
            // Logic for drawing arrows via SVG vectors
            if (sourceButton <= 2) {
                arrowStartY = 50;
            } else {
                arrowStartY = 150;
            }

            if (destinationButton <= 5) {
                arrowEndY = 150;
            } else {
                arrowEndY = 250;
            }

            if (sourceButton === 0 || sourceButton === 3 || sourceButton === 6) {
                arrowStartX = 50;
            } else if (sourceButton === 1 || sourceButton === 4 || sourceButton === 7) {
                arrowStartX = 150;
            } else if (sourceButton === 2 || sourceButton === 5 || sourceButton === 8) {
                arrowStartX = 250;
            }

            if (destinationButton === 3 || destinationButton === 6) {
                arrowEndX = 50;
            } else if (destinationButton === 4 || destinationButton === 7) {
                arrowEndX = 150;
            } else if (destinationButton === 5 || destinationButton === 8) {
                arrowEndX = 250;
            }

            //sets the "d" property of the path object (each path is an arrow)
            let path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            arrowPath = `M${arrowStartX},${arrowStartY} L${arrowEndX},${arrowEndY}`;
            path.setAttribute('d', arrowPath);
            path.setAttribute('style', arrowBlue);
            svg.appendChild(path);
        }

        for (let x = 0; x < redMoves.length; x++) {
            let sourceButton = redMoves[x].f, destinationButton = redMoves[x].t;
            let svg = document.getElementById('svg' + index);

            console.log('red source ->' + sourceButton + ' , destination ->' + destinationButton);
            // Logic for drawing arrows via SVG vectors
            if (sourceButton <= 2) {
                arrowStartY = 50;
            } else {
                arrowStartY = 150;
            }

            if (destinationButton <= 5) {
                arrowEndY = 150;
            } else {
                arrowEndY = 250;
            }

            if (sourceButton === 0 || sourceButton === 3 || sourceButton === 6) {
                arrowStartX = 50;
            } else if (sourceButton === 1 || sourceButton === 4 || sourceButton === 7) {
                arrowStartX = 150;
            } else if (sourceButton === 2 || sourceButton === 5 || sourceButton === 8) {
                arrowStartX = 250;
            }

            if (destinationButton === 3 || destinationButton === 6) {
                arrowEndX = 50;
            } else if (destinationButton === 4 || destinationButton === 7) {
                arrowEndX = 150;
            } else if (destinationButton === 5 || destinationButton === 8) {
                arrowEndX = 250;
            }

            //sets the "d" property of the path object (each path is an arrow)
            let path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            arrowPath = `M${arrowStartX},${arrowStartY} L${arrowEndX},${arrowEndY}`;
            path.setAttribute('d', arrowPath);
            path.setAttribute('style', arrowRed);
            svg.appendChild(path);
        }
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