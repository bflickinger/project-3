import React, { Component } from "react";
import { Modal } from 'react-materialize';
import PropTypes from "prop-types";

class FlashMessage extends Component {
  constructor(props) {
    super(props);
  }

  triggerDeleteFlashMessage() {
    console.log('flashmessage fired');
    this.props.deleteFlashMessage(this.props.message.id);
  }

  componentDidMount() {
    if(typeof this.props.message.id != 'undefined'){
      this.modalButton.click();
    }
  }

  render() {
    const { text } = this.props.message;
    const trigger =<button onClick={this.onClick} className="hide" ref={button => this.modalButton = button}></button>
    return (
      <div>
        <Modal options={{dismissible: false, onCloseEnd: () => this.triggerDeleteFlashMessage()}} id="newUser"  header="Registration Successful!" trigger={trigger}>
          {text}
        </Modal>
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

export default FlashMessage;