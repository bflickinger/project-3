import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Modal } from "react-materialize";
import "./style.css";

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
            <button className="btn btn-small waves-effect waves-light hoverable blue accent-3">
              AI Reset
            </button>
            <button className="btn btn-small waves-effect waves-light hoverable blue accent-3">
              Change Board
            </button>
            <button className="btn btn-small waves-effect waves-light hoverable blue accent-3">
              Placeholder
            </button>
          </div>
          <div className="col s6">
            <Modal
              id="instructions"
              header="Game Instructions!"
              message="Testing"
              trigger={
                <button className="btn btn-small waves-effect waves-light hoverable blue accent-3">
                  Game Instructions
                </button>
              }>1. Testing
            </Modal>
            <button className="btn btn-small waves-effect waves-light hoverable blue accent-3">
              Switch Order
            </button>
            <button className="btn btn-small waves-effect waves-light hoverable blue accent-3">
              <a
                href="https://www.youtube.com/watch?v=FWOZmmIUqHg"
                target="_blank"
              >
                AI Tutorial
              </a>
            </button>
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
