import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
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
        <div className="container-fluid">
          <div className="row" id="main-row">
            <div id="leftside-col" className="col s12 l6">
              <Activegame />
            </div>
            <div id="rightside-col" className="col s12 l6">
              <p>TESTINGdfadaafad fasddfasdfdafasdfj aksdfjlk jalskdfja sdlkfj alk fjaldfka lkdfja lksjfakdf alksdjflka sjflka jflkajdsflk jflkajsdlf ajdflk ajdflka jdkflsj
              </p>
            </div>
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
