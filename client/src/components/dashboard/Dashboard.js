import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import Leftside from "../game/leftside";
import Rightside from "../game/rightside";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    // const { user } = this.props.auth;

    return (
      <div>
        <Navbar location={this.props.location.pathname} history={this.props.history} />
        <div>
        </div>
        <div className="container" style={{width:"100%",minHeight:"75vh"}}>
          <div className="row" style={{minHeight:"75vh"}}>
            <Leftside />
            <Rightside />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
