import React, {useState} from 'react'
import Row from 'react-bootstrap/Row'; 
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form'; 
import InputGroup from 'react-bootstrap/InputGroup';

import { addCustomer } from '../../Services/AddUserByAdmin';
import ui from '../../themes'

function AddUser(props) {
    const [customer, setCustomer] = useState({
    userName: "",
    email: "",
    password:"",
    });

    const handleAddCustomer= (e)=>{
        addCustomer(customer).then((result)=> {
            props.addAction(result)
        }) 
        props.closeAction()
       
        
    }

  return (
    <div>

            <Row className="align-items-center"> 
        <Row xs="auto"> 
          <Form.Label htmlFor="inlineFormInput" visuallyHidden> 
            Name 
          </Form.Label> 
          <InputGroup className="mb-2">
          <Form.Control 
            className="mb-2" 
            id="inlineFormInput" 
            placeholder="Username" 
            style={{backgroundColor:`${ui.searchesInput}`,color:`${ui.normalText}`,borderColor:`${ui.borders}`}}
            onChange={(e) => setCustomer({...customer, userName: e.target.value })}
          /> 
          </InputGroup>
        </Row> 
        <Row xs="auto" className="mb-2"> 
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden> 
            Username 
          </Form.Label> 
          <InputGroup className="mb-2"> 
            <InputGroup.Text >@</InputGroup.Text> 
            <Form.Control style={{backgroundColor:`${ui.searchesInput}`,color:`${ui.normalText}`,borderColor:`${ui.borders}`}}
            id="inlineFormInputGroup" 
            placeholder="email"
            placeholderTextColor='white'
            onChange={(e) => setCustomer({...customer, email: e.target.value })}
            /> 
          </InputGroup> 
        </Row> 
        
        <Row xs="auto"> 
        <Form.Label htmlFor="inlineFormInput" visuallyHidden> 
            Name 
          </Form.Label> 
          <InputGroup className="mb-2">
          <Form.Control  
            className="mb-2" 
            id="inlineFormInput" 
            placeholder="password" 
            style={{backgroundColor:`${ui.searchesInput}`,color:`${ui.normalText}`,borderColor:`${ui.borders}`}}
            onChange={(e) => setCustomer({...customer, password: e.target.value })}
          /> 
          </InputGroup>
        </Row> 
        <Row xs="auto" className='justify-content-center'> 
          <Button onClick={handleAddCustomer} type="submit" className="mb-2" style={{backgroundColor:`${ui.Buttons}`, color:`${ui.normalText}`}}> 
            Submit 
          </Button> 
        </Row> 
      </Row>

    </div>
  )
}

export default AddUser