import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Buttoncontrol from "./Buttoncontrol";

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    // const { user } = this.props.auth;
    return (
      <div className="navbar-fixed">
      {console.log("navbar props",this.props)}
      {console.log("navbar props from login",this.props.location)}
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            {/* <b>Hey there,</b> {user.name.split(" ")[0]} */}
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
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

