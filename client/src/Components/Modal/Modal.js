import React , {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SignUpUser from '../../Routes/Visitor/SignUpUser/SignUpUser';


function Example(props) {
//   const [isCustomer,setIsCustomer] = useState(props.isCustomer)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Open
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
         {/* {isCustomer && <SignUpUser/>} */}
         <SignUpUser/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example