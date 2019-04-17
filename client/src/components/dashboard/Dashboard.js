import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import Buttonbar from "../layout/Buttonbar";
import Activegame from "../game/activegame";
import Memorytracker from "../game/memorytracker";
import "./style.css";


class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {

    return (
      <div>
        <Navbar
          location={this.props.location.pathname}
          history={this.props.history}
        />
        <Buttonbar />
        <div className="container-fluid">
          <div className="row" id="main-row">
            <div id="leftside-col" className="col s6">
              <Activegame />
            </div>
            <div id="rightside-col" className="col s6" />
              <Memorytracker />
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
