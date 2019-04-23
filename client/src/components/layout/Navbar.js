import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Buttoncontrol from "./Buttoncontrol";
import { Sidenav } from "materialize-css";
import { Modal } from "react-materialize";
import "./style.css";

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    let elems = document.querySelectorAll(".sidenav");
    let instance = Sidenav.init(elems);
  }

  render() {

    return (
      <div>
        {console.log('Navbar props ->', this.props)}
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo center">
              Hexapawn
            </a>
            <a href="w" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <Buttoncontrol
              location={this.props.location}
              history={this.props.history}
            />
            <ul className="hide-on-med-and-down">
              <li>
                <a href="w">AI Reset</a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=FWOZmmIUqHg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AI Tutorial
                </a>
              </li>
              <div id="modal-div">
                <Modal
                  id="instructions"
                  header="Game Instructions!"
                  trigger={
                    <li>
                      <a href="w">Game Instructions</a>
                    </li>
                  }
                >
                  Hexpawn is designed to show machine learning at a very basic
                  level. The AI computer will get progressively more difficult to
                  beat after learning from its mistakes. To win the game do ONE of the following:
                <table>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          Get one of your pawns to the other side of the board.
                      </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Remove all the opponents pawns from the board.</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Force a draw on your turn to move.</td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead>
                      <tr>
                        <th />
                        <th>Rules</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          You are white and the computer is black. You get the
                          first move.
                      </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>
                          Your pawn can move forward one square if the square is
                          empty.
                      </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>
                          Your pawn can move diagonally one square to attack a
                          black pawn.
                      </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>
                          Click the pawn you want to move, then click the
                          destination square.
                      </td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>
                          The computer will move automatically and it will be your
                          turn again.
                      </td>
                      </tr>
                    </tbody>
                  </table>
                </Modal>
              </div>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <a href="w">AI Reset</a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/watch?v=FWOZmmIUqHg"
              target="_blank"
              rel="noopener noreferrer"
            >
              AI Tutorial
            </a>
          </li>
          <Modal
            id="instructions"
            header="Game Instructions!"
            trigger={
              <li>
                <a href="w">Game Instructions</a>
              </li>
            }
          >
            Hexpawn is designed to show machine learning at a very basic level.
            The AI computer will get progressively more difficult to beat after
            learning from its mistakes. To win the game do ONE of the following:
            <table>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Get one of your pawns to the other side of the board.</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Remove all the opponents pawns from the board.</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Force a draw on your turn to move.</td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th />
                  <th>Rules</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    You are white and the computer is black. You get the first
                    move.
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    Your pawn can move forward one square if the square is
                    empty.
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    Your pawn can move diagonally one square to attack a black
                    pawn.
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    Click the pawn you want to move, then click the destination
                    square.
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                    The computer will move automatically and it will be your
                    turn again.
                  </td>
                </tr>
              </tbody>
            </table>
          </Modal>
        </ul>
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
