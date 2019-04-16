import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import './style.css';

class Buttonbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div id="buttonbar" className="container-fluid">
        <div id="buttonbar-row" className="row">
            <div className="col s6">
                <button className="btn btn-small waves-effect waves-light hoverable blue accent-3">AI Reset</button>
                <button className="btn btn-small waves-effect waves-light hoverable blue accent-3">Change Board</button>
                <button className="btn btn-small waves-effect waves-light hoverable blue accent-3">Placeholder</button>
            </div>
            <div className="col s6">
                <button className="btn btn-small waves-effect waves-light hoverable blue accent-3">Game Instructions</button>
                <button className="btn btn-small waves-effect waves-light hoverable blue accent-3">Switch Order</button>
                <button className="btn btn-small waves-effect waves-light hoverable blue accent-3">AI Resources</button>
            </div>
        </div>
      </div>
    );
  }
}

Buttonbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Buttonbar);