import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import Activegame from "../game/activegame";
import Memorytracker from "../game/memorytracker";
import "./style.css";

class Dashboard extends Component {
  render() {

    return (
      <div>
        <Navbar
          location={this.props.location.pathname}
          history={this.props.history}
        />
        <div id="main-dash-container" className="container-fluid">
          <div className="row" id="main-row">
            <div id="leftside-col" className="col s12 l6">
              <Activegame />
            </div>
            <div id="rightside-col" className="col s12 l6">
              <div className="container-fluid" id="boards-titlebox">
                <div className="row scoreboard-row">MEMORY HISTORY</div>
                <div className="row scoreboard-row">
                  <div id="winning-moves" className="col s6">Winning Moves</div>
                  <div id="losing-moves" className="col s6">Losing Moves</div>
                </div>
              </div>
              <div className="container-fluid" id="boards-box">
                <div className="row" id="boards-row">
                  <div className="col s12" id="boards-col">
                    <Memorytracker gameprops={this.props.game}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  game: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  
};

const mapStateToProps = state => ({
  auth: state.auth,
  game: state.game
});

export default connect(
  mapStateToProps,
  {logoutUser}
)(Dashboard);
