import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import Leftside from "../game/leftside";
import Rightside from "../game/rightside";
import "./style.css";

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
       <div className="container-fluid">
         <div className="row" id="main-row">
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
