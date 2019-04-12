import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./style.css";

let board, playBtn, turn, memory = [], lastMove = { brd: "", mvi: 0 },
    clicks = { first: null, second: null }, win = { c: 0, p: 0 }, score;

class Activegame extends Component {
    state = {
        // board: [],
        // isHidden: true,
        // turn: "",
        memory: [],
        // lastMove: { brd: "", mvi: 0 },
        // clicks: { first: null, second: null },
        win: { c: 0, p: 0 },
        // score: ""
    }

    componentDidMount = () => {
        this.createBtns();
        this.restart();
    };

    // toggleHidden = () => {
    //     this.setState({
    //         isHidden: !isHidden
    //     });
    // };

    getPossibles = () => {
        let pos = [], tp = turn === 0 ? "W" : "B", gp = turn === 0 ? "B" : "W";
        // console.log("board: ",board);
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
        // console.log(`getPossiblities result ->`, pos);
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
        // this.setState ({
        //     board: tempboard
        // });    
        if (needSave) {
            memory.push({ board: brd, moves: mvs });
            let newMemoryState = this.state.memory.slice();
            newMemoryState.push({ board: brd, moves: mvs });
            this.setState({
                memory: newMemoryState
            });
            console.log("Memory State ->",this.state.memory);
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
        // console.log(`getBoard result->`, str);
        return str;
    }
    
    updateScore = () => {
        // let tempscore = score;
        score.innerHTML = "Player: " + win.p + " Computer: " + win.c;
        // this.setState ({
        //     score: tempscore
        // });
    }
    
    finish = (r) => {
        let str = "The Computer wins!";
        if (r === 0) {
            str = "You win!";
            win.p++;
            // this.setState(Object.assign(this.state.jasper,{name:'someOtherName'}));
            this.setState (Object.assign(
                this.state.win,
                {
                p: win.p
            }));
            // console.log(this.state.win);
            for (let i = 0; i < memory.length; i++) {
                if (memory[i].board === lastMove.brd) {
                    memory[i].moves.splice(lastMove.mvi, 1);
                    break;
                }
            }
        } else {
            win.c++;
            this.setState (Object.assign(
                this.state.win,
                {
                c: win.c
            }));
        }
        playBtn.innerHTML = str + "<br />Click to play.";
        playBtn.className = "button long"
        // this.setState ({
        //     playBtn: tempplayBtn
        // });
        console.log(this.state.win);
        this.updateScore();
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
        // this.setState ({
        //     turn: tempturn
        // });
        r = this.checkFinished();
    
        if (r > -1) {
            this.finish(r);
        } else {
            if (turn === 1) {
                r = this.computerMoves();
                if (r < 0) this.nextPlayer();
                else this.finish(r);
            }
        }
    }
    
    search = (o, arr)  =>{
        for (let i = 0; i < arr.length; i++) {
            if (o.f === arr[i].f && o.t === arr[i].t) return i;
        }
        return -1;
    }
    
    btnHandle = (e) => {
        // console.log("from click: ", e);
        if (turn > 0) return;
        let ti = e.target.i, tj = e.target.j;
    
        if (clicks.first === null && board[ti][tj] === "W") {
            clicks.first = e.target;
            clicks.first.className += " marked"
            // this.setState ({
            //     clicks: tempclicks
            // });
        } else if (clicks.first !== null && board[ti][tj] === "W") {
            clicks.first.className = clicks.first.className.split(" ")[0];
            clicks.first = clicks.second = null;
        } else if (clicks.first !== null && (board[ti][tj] === " " ||
            board[ti][tj] === "B")) {
            clicks.second = e.target;
            // this.setState ({
            //     clicks: tempclicks
            // });
            let moves = this.getPossibles(turn),
                i = clicks.first.i, ii = clicks.second.i,
                j = clicks.first.j, jj = clicks.second.j,
                obj = { f: i + j * 3, t: ii + jj * 3 };
            if (this.search(obj, moves) > -1) {
                board[i][j] = " "; board[ii][jj] = "W";
                clicks.first.className = clicks.first.className.split(" ")[0];
                clicks.first = clicks.second = null;
                // this.setState ({
                //     board: tempboard,
                //     clicks: tempclicks
                // });
                this.nextPlayer();
            }
        }
    };

    updateBtns = () => {
        let b;
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                b = document.getElementById("btn" + (i + j * 3));
                // console.log('updateBtns B: ', b);
                b.innerHTML = board[i][j] === "B" ? "&#x265F;" : board[i][j] === "W" ? "&#x2659;" : " ";
            }
        }
        // this.setState({
        //     board: tempboard
        // });
    };


    restart = () => {
        turn = 0;
        // this.setState({
        //     turn: tempturn
        // });
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
        // console.log("tempboard results ->", tempboard);
        // this.setState({
        //     board: tempboard
        // });
        // console.log("let board -> ", board);
    };

    createBtns = () => {
        let b, d = document.createElement("div"), v = false, x = document.getElementById("hexa");
        // console.log("hexa :",x);
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
        playBtn.addEventListener("click", this.restart, false);
        score = document.createElement("p");
        score.className = "txt";
        // this.setState ({
        //     playBtn: tempplayBtn,
        //     score: tempscore
        // });
        // console.log(playBtn);
        // console.log(score);
        d.appendChild(score);
        d.appendChild(playBtn);
        this.updateScore();
    }

    render() {
        // const { user } = this.props.auth;
        return (
            <div id="hexa"></div>
        );
    }
}

Activegame.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Activegame);