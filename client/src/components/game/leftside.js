import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Activegame from "./activegame";
import "./style.css";
import Scoreboard from "./scoreboard";

class Leftside extends Component {
 
     componentDidUpdate = () => {
        console.log("Active game updated leftside");
    };

    render() {
        // const { user } = this.props.auth;
        return (
            <div id="leftside-col" className="col s6">
                <Scoreboard />
                <Activegame />
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