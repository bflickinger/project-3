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

  componentDidMount() {
    if(typeof this.props.message.id != 'undefined'){
      console.log("flashmessage this.props.message.id ->", this.props.message.id);
      this.modalButton.click();
    }
  }

  render() {
    const { id, type, text } = this.props.message;
    // const trigger =<Button onClick={this.onClick}>New Player!</Button>;
    const trigger =<button onClick={this.onClick} className="hide" ref={button => this.modalButton = button}></button>
    return (
      <div>
        <Modal id="newUser" header="Registration Successful!" trigger={trigger}>
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