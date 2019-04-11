import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Buttoncontrol from "./Buttoncontrol";
import './style.css';

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    console.log("User? ", user);
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper white">
            {console.log("are we authenticated? ",this.props.auth.isAuthenticated)}
            <nav-item id="name"  style={{color:"black",marginLeft: "5px"}}>{this.props.auth.isAuthenticated ? "Welcome, " + user.name.split(" ")[0]:null} </nav-item>
            <Link
              to="/"

              className="col s5 brand-logo center black-text"
            >
              Hexapawn
            </Link>
            <Buttoncontrol location={this.props.location} history={this.props.history}/>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);

