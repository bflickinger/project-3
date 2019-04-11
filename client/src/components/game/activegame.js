import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import * as Hexa from "./hexa";

class Activegame extends Component {
    state = {
        board: [],
        isHidden: true,
        turn: "",
        memory: [],
        lastMove: { brd: "", mvi: 0 },
        clicks: { first: null, second: null },
        win: { c: 0, p: 0 },
        score: ""
    }

    componentDidMount = () => {
        // Hexa.createBtns();
        this.restart();
        // console.log("didmount memory",Hexa.memory);
    };

    toggleHidden = () => {
        this.setState({
            isHidden: !this.state.isHidden
        });
    };

    restart = () => {
        let tempturn = 0;
        this.setState({
            turn: tempturn
        });
        this.createBoard();
        // Hexa.updateBtns();
    };

    createBoard = () => {
        let tempboard = new Array(3);
        for (let i = 0; i < 3; i++) {
            tempboard[i] = new Array(3);
        }
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                tempboard[i][j] = j === 0 ? "B" : j === 2 ? "W" : " ";
            }
        }
        // console.log(`createBoard results ->`, tempboard);
        this.setState({
            board: tempboard
        });
    };

    updateBtns = () => {
        let b, tempboard;
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                b = document.getElementById("btn" + (i + j * 3));
                b.innerHTML = tempboard[i][j] === "B" ? "&#x265F;" : tempboard[i][j] === "W" ? "&#x2659;" : " ";
            }
        }
        this.setState({
            board: tempboard
        });
    };

    btnHandle = (e) => {
        console.log("from click: ", e);
        // if (this.state.turn > 0) return;
        // let ti = e.target.i, tj = e.target.j;
    
        // if (clicks.first === null && board[ti][tj] === "W") {
        //     clicks.first = e.target;
        //     clicks.first.className += " marked"
        // } else if (clicks.first !== null && board[ti][tj] === "W") {
        //     clicks.first.className = clicks.first.className.split(" ")[0];
        //     clicks.first = clicks.second = null;
        // } else if (clicks.first !== null && (board[ti][tj] === " " ||
        //     board[ti][tj] === "B")) {
        //     clicks.second = e.target;
        //     let moves = getPossibles(turn),
        //         i = clicks.first.i, ii = clicks.second.i,
        //         j = clicks.first.j, jj = clicks.second.j,
        //         obj = { f: i + j * 3, t: ii + jj * 3 };
        //     if (search(obj, moves) > -1) {
        //         board[i][j] = " "; board[ii][jj] = "W";
        //         clicks.first.className = clicks.first.className.split(" ")[0];
        //         clicks.first = clicks.second = null;
        //         nextPlayer();
        //     }
        // }
    };

    render() {
        // const { user } = this.props.auth;
        return (
            <div id="hexa" className="col s6 blue" style={{ minHeight: "88vh", paddingTop: "50px" }}>
                <div className="board">
                    <button onClick={this.btnHandle.bind()} id="btn0" className="empty">♟</button>
                    <button onClick={this.btnHandle.bind(this)} id="btn1" className="button">♟</button>
                    <button onClick={this.btnHandle.bind(this)} id="btn2" className="empty">♟</button>
                    <button onClick={this.btnHandle.bind(this)} id="btn3" className="button"> </button>
                    <button onClick={this.btnHandle.bind(this)} id="btn4" className="empty"> </button>
                    <button onClick={this.btnHandle.bind(this)} id="btn5" className="button"> </button>
                    <button onClick={this.btnHandle.bind(this)} id="btn6" className="empty">♙</button>
                    <button onClick={this.btnHandle.bind(this)} id="btn7" className="button">♙</button>
                    <button onClick={this.btnHandle.bind(this)} id="btn8" className="empty">♙</button>
                    <p className="txt">Player: {this.state.win.p} Computer: {this.state.win.p}</p>
                    {!this.state.isHidden && <button onClick={this.toggleHidden.bind(this)} className="button long"></button>}
                    {/* {console.log("State of: board", this.state.board)} */}
                </div>
            </div>
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