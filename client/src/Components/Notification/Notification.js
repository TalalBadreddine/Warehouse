import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Notification = ({ firstBtn, secondBtn, body, head, close, isHidden}) => {
 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false) && close(false);
  const handleShow = () => setShow(true);
  isHidden && setShow(true)

  return (
    <>

      
    </>
  );
}

export default Notification