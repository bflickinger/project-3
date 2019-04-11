import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Activegame from "./activegame";
// import Game from './game';

class Leftside extends Component {
 
     componentDidUpdate = () => {
        console.log("Active game updated leftside");
    };

    render() {
        // const { user } = this.props.auth;
        return (
            <Activegame />
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