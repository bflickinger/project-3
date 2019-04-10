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
            <div className="right">
                {/* {console.log("buttoncontrol props", this.props)} */}
                <button
                    style={{
                        // width: "150px",
                        borderRadius: "3px",
                        // letterSpacing: "1.5px",
                        marginTop: "5px",
                        marginRight: "5px"
                    }}
                    onClick={this.buttonClick}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3 right"
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
