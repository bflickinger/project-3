import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import * as hexa from "./hexa.js";

class Leftside extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount = mp => {
        
    }

    render() {

        // const { user } = this.props.auth;
        return (
            <div className="col s6 blue">
                <h1 style={{ color: "white", textAlign:"center", minHeight:"75vh"}}>LEFT</h1>
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