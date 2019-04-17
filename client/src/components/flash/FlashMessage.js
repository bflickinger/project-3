import React, { Component } from "react";
import { Modal, Button } from 'react-materialize';
import PropTypes from "prop-types";
import classnames from 'classnames';

class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  isNewUser() {
    if(typeof this.props.message.id != 'undefined'){
      console.log("flashmessage isnewuser -> undefined");
    }
  }

  render() {
    const { id, type, text } = this.props.message;
    const trigger = this.props.newUser;
    console.log('flashmessage props ->', trigger);
    // <Button onClick={this.onClick}>New Player!</Button>;
    return (
      <div className={classnames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })}>
        {console.log(this.props.message)}
        <button onClick={this.onClick} className="close"><span>&times;</span></button>
        {text}
        <Modal header="Registration Successful!" trigger={trigger}>
          {text}
        </Modal>
      </div>
    );
  }
}

// <div className={classnames('alert', {
//   'alert-success': type === 'success',
//   'alert-danger': type === 'error'
// })}>
//   {console.log(this.props.message)}
//   <button onClick={this.onClick} className="close"><span>&times;</span></button>
//   {text}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

export default FlashMessage;