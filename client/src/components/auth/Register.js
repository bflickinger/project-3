import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { addFlashMessage } from "../../actions/flashMessages";
import classnames from "classnames";
import Navbar from "../layout/Navbar";
import "./style.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      isNewUser: false,
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser).then(
      (res) => {
        console.log(res);
        if (typeof res !== 'undefined' && res.status === 200) {
          console.log("addflashmessage res -> ", res);
          this.props.addFlashMessage({
            type: 'success',
            text: 'You are now registered. Please login.'
          });
          this.props.history.push("/login");
        }
      });

    // this.props.addFlashMessage({
    //   type: 'success',
    //   text: 'You are now registered. Please login.'
    // });
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Navbar location={this.props.location.pathname} history={this.props.history} />
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4 className="center" style={{ color: "white" }}>
                  <b>Register</b>
                </h4>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    className={classnames("", {
                      invalid: errors.name
                    })}
                  />
                  <label htmlFor="name">Name</label>
                  <span className="red-text">{errors.name}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email
                    })}
                  />
                  <label htmlFor="email">Email</label>
                  <span className="red-text">{errors.email}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password
                    })}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">{errors.password}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password2
                    })}
                  />
                  <label htmlFor="password2">Confirm Password</label>
                  <span className="red-text">{errors.password2}</span>
                </div>
                <div className="col s12 center" style={{ paddingLeft: "11.250px" }}>
                  <button
                    type="submit"
                    className="btn waves-effect waves-light hoverable accent-3 btn-large"
                  >
                    Sign up
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, addFlashMessage }
)(withRouter(Register));
