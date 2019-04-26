import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, Button } from "react-materialize";
import {
    incrementComputer, incrementPlayer, postMemory, setMemory, getMemory, getScore, postScore, postBoard
} from "../../actions/gameActions";
import Scoreboard from "./scoreboard";

import "./style.css";


let board, playBtn, turn, memory = [], lastMove = { brd: "", mvi: 0 },
    clicks = { first: null, second: null }

let fadeIn =() => {
    document.getElementById('title').style.opacity = '1';
    document.getElementById('title').style.color = 'red';
    document.getElementById('main-navbar').style.background = 'rgba(0,0,0,0.5)';
}


class Activegame extends Component {
 
    componentDidMount = () => {
        let userId = this.props.auth.user.id;
        this.props.getMemory(userId);
        this.props.getScore(userId);
        this.createBtns();
        this.restart();
    }
   
    getPossibles = () => {
        let pos = [], tp = turn === 0 ? "W" : "B", gp = turn === 0 ? "B" : "W";
        for (let j = 0; j < 3; j++) {
            let jj = j + (turn === 0 ? -1 : 1);
            if (jj < 3 && jj > -1) {
                for (let i = 0; i < 3; i++) {
                    if (board[i][j] === tp) {
                        for (let k = -1; k < 2; k++) {
                            if (i + k > -1 && i + k < 3 &&
                                ((board[i + k][jj] === " " && i + k === i) || (board[i + k][jj] === gp && i + k !== i))) {
                                pos.push({ f: i + j * 3, t: i + k + jj * 3 });
                            }
                        }
                    }
                }
            }
        }
        return pos;
    }

    computerMoves = () => {
        let brd = this.getBoard(), mvs, needSave = false;
        for (let i = 0; i < memory.length; i++) {
            if (memory[i].board === brd) {
                mvs = memory[i].moves;
                break;
            }
        }
        if (!mvs) {
            mvs = this.getPossibles();
            needSave = true;
        }
        if (mvs.length === 0) return 0;

        let idx = Math.floor(Math.random() * mvs.length);
        lastMove.brd = brd;
        lastMove.mvi = idx;
        let i = mvs[idx].f % 3, j = Math.floor(mvs[idx].f / 3),
            ii = mvs[idx].t % 3, jj = Math.floor(mvs[idx].t / 3);
        board[i][j] = " "; board[ii][jj] = "B";
        if (needSave) {
            memory.push({ board: brd, moves:mvs });
            const id = this.props.auth.user.id;
            console.log(this.props,mvs);
            this.props.postMemory(id, memory);
            this.props.setMemory(memory);
            this.props.postBoard(memory.slice(-1)[0]);
        }
        this.updateBtns();
        return -1;
    }

    getBoard = () => {
        let str = "";
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                str += board[i][j];
            }
        }
        return str;
    }

    finish = (r) => {
        let str = "The Computer wins!";
        const id = this.props.auth.user.id;
        if (r === 0) {
            str = "You win!";
            this.props.incrementPlayer();
            this.props.postScore(id, this.props.game);
            for (let i = 0; i < memory.length; i++) {
                if (memory[i].board === lastMove.brd) {
                    memory[i].moves.splice(lastMove.mvi, 1);
                    break;
                }
            }
            this.props.postMemory(id, memory);
            this.props.setMemory(memory);
            playBtn.innerHTML = str + "<br />Click to play again.";
            playBtn.className = "button long"
        } else {
            this.props.incrementComputer();
            this.props.postScore(id, this.props.game);
            document.getElementById("computer-wins").click();
            document.getElementById('title').innerHTML = "Elspith's Revenge!";
            fadeIn();
        }
    }

    checkFinished = () => {
        if (this.getPossibles().length < 1) return turn === 0 ? 1 : 0;

        //Checks to see if either color has made it to the opposite side of the board
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === "W") return 0;
            if (board[i][2] === "B") return 1;
        }

        //Check to see if only one color piece is left.
        let w = 0, b = 0;
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                if (board[i][j] === "W") w++;
                if (board[i][j] === "B") b++;
            }
        }
        if (w === 0) return 1;
        if (b === 0) return 0;
        //Not finished
        return -1;
    }

    nextPlayer = () => {
        let r;
        this.updateBtns();
        turn = turn === 0 ? 1 : 0;
        r = this.checkFinished();

        if (r > -1) {
            this.finish(r);
        } else {
            if (turn === 1) {
                setTimeout(() => {
                    r = this.computerMoves();
                    if (r < 0) this.nextPlayer();
                    else this.finish(r);
                }, 500);
 
            }
        }
    }

    search = (o, arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (o.f === arr[i].f && o.t === arr[i].t) return i;
        }
        return -1;
    }

    btnHandle = (e) => {
        
        memory = this.props.game.memory;

        if (turn > 0) return;
        let ti = e.target.i, tj = e.target.j;

        if (clicks.first === null && board[ti][tj] === "W") {
            clicks.first = e.target;
            clicks.first.className += " marked"
            console.log()
        } else if (clicks.first !== null && board[ti][tj] === "W") {
            clicks.first.className = clicks.first.className.split(" ")[0];
            clicks.first = clicks.second = null;
        } else if (clicks.first !== null && (board[ti][tj] === " " ||
            board[ti][tj] === "B")) {
            clicks.second = e.target;
            let moves = this.getPossibles(turn),
                i = clicks.first.i, ii = clicks.second.i,
                j = clicks.first.j, jj = clicks.second.j,
                obj = { f: i + j * 3, t: ii + jj * 3 };
            if (this.search(obj, moves) > -1) {
                board[i][j] = " "; board[ii][jj] = "W";
                clicks.first.className = clicks.first.className.split(" ")[0];
                clicks.first = clicks.second = null;
                this.nextPlayer();
            }
        }
    };

    updateBtns = () => {
        let b;
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                b = document.getElementById("btn" + (i + j * 3))
                b.innerHTML = board[i][j] === "B" ? '<img class="pawnblack" src="pawnblack.png">' : board[i][j] === "W" ? '<img class="pawnwhite" src="pawnwhite.png">' : " ";
            }
        }
    };

    restart = () => {
        turn = 0;
        this.createBoard();
        this.updateBtns();
        playBtn.className += " hide";
    };

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
        let b, d = document.createElement("div"), v = false, x = document.getElementById("hexa");
        d.className += "board";
        x.appendChild(d);
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                b = document.createElement("button");
                b.id = "btn" + (i + j * 3);
                b.i = i; b.j = j;
                b.addEventListener("click", this.btnHandle, false);
                b.appendChild(document.createTextNode(""));
                d.appendChild(b);
                if (v) b.className = "button"
                else b.className = "empty";
                v = !v;
            }
        }
        playBtn = document.createElement("button");
        playBtn.className = "button long hide";
        playBtn.id = "reset-button";
        playBtn.addEventListener("click", this.restart, false);
        d.appendChild(playBtn);
    }

    render() {
        return (
            <div>
                < Scoreboard player={this.props.game.player} computer={this.props.game.computer} />
                <div id="hexa">
                </div>
                <div>
                    <Modal
                    options={{dismissible: false}}
                    id="elspith-modal"
                    header="Elspith's Revenge! The AI wins!"
                    actions={<div id="elspith-footer"><Button id="play-again-button" modal="close" onClick={this.restart}>Click to Play Again</Button></div>}
                    trigger={<button id="computer-wins" className="hide">Revenge</button>
                    }
                    >
                    <img id="elspith-jpg" src="cyborg.png" alt="Elspith"></img>
                    </Modal>
                </div>
            </div>
        );
    }
}

Activegame.propTypes = {
    auth: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    game: state.game
});

export default connect(
    mapStateToProps, {
         incrementPlayer, incrementComputer, postMemory, setMemory, getMemory, getScore, postScore, postBoard
        }
)(Activegame);