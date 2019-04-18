import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Buttoncontrol extends Component {
    state = {
        btntext: 'test'
    }

    buttonClick = e => {
        e.preventDefault();
        switch (this.props.location) {
            case "/":
                this.props.history.push('/register');
                console.log("switch /");
                break;
            case "/login":
                this.props.history.push('/register');
                console.log("/login");
                break;
            case "/register":
                this.props.history.push('/login');
                console.log("/register");
                break;
            case "/dashboard":
                this.props.logoutUser();
                console.log("/dashboard");
                break;
            default:
                return;
        }
    };

    componentDidMount = wb => {
        switch (this.props.location) {
            case "/":
                this.setState({
                    btntext: "Register"
                });
                // console.log("/");
                break;
            case "/login":
                this.setState({
                    btntext: "Register"
                });
                // console.log("/login");
                break;
            case "/register":
                this.setState({
                    btntext: "Login"
                });
                // console.log("/register");
                break;
            case "/dashboard":
                this.setState({
                    btntext: "Logout"
                });
                // console.log("/dashboard");
                break;
            default:
                return;
        }
    };

    render() {
        return (
            <div className="right" style={{marginRight: "10px"}}>
                <button
                    style={{
                        borderRadius: "3px"
                    }}
                    onClick={this.buttonClick}
                    id="navbar-button"
                    className="btn btn-small waves-effect waves-light hoverable accent-3"
                >
                    {this.state.btntext}
                </button>
            </div>
        );
    }
}

Buttoncontrol.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Buttoncontrol);
