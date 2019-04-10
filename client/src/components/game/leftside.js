import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import * as Hexa from "./hexa";

class Leftside extends Component {
    // state = {
    //     board: [[],[]],
    //     playBtn: "",
    //     memory: [],
    //     lastMove: { brd: "", mvi: 0 },
    //     clicks: { first: null, second: null },
    //     win: { c: 0, p: 0 },
    //     score: ""
    // }

    componentDidMount = mp => {
        Hexa.createBtns();
        Hexa.restart();
    };

    render() {

        // const { user } = this.props.auth;
        return (
            <div id="hexa" className="col s6 blue">
                <h1 style={{ color: "white", textAlign: "center", minHeight: "75vh" }}>LEFT</h1>
            </div>
        );
    }
}

Leftside.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Leftside);