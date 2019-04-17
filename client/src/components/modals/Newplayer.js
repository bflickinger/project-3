import React from "react";
import { Modal, Button } from 'react-materialize';

const trigger = <Button>New Player!</Button>;

export default () => (
  <Modal header="Registration Successful!" trigger={trigger}>
    Please enter your e-mail and password to login...
  </Modal>
);