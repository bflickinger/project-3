import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./style.css";

class Scoreboard extends Component {

    render() {
        const { user } = this.props.auth;

        return (
            <div className="container-fluid" id="scoreboard">
                <div className="row scoreboard-row">SCOREBOARD</div>
                <div className="row scoreboard-row">
                    <div className="col s6">{this.props.auth.isAuthenticated ? user.name.split(" ")[0] + ": " + this.props.player:null}</div>
                    <div className="col s6">AI: {this.props.computer}</div>
                </div>
            </div>
        );
    }
}

Scoreboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Scoreboard);