import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./style.css";

class Memorytracker extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount = () => {
        this.createBtns();
    }
    
    createBtns = () => {
        let b, d = document.createElement("div"), v = false, x = document.getElementById("memory-tracker");
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
    }

    render() {

        return (
                <div id="memory-tracker">
                </div>
        );
    }
}

Memorytracker.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Memorytracker);