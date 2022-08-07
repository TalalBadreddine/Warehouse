import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Figure from 'react-bootstrap/Figure';
import { addWarehouse } from '../../Services/AddNewWarehouse';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function PostNewWarehouse() {
  const navigate=useNavigate();
  useEffect(()=>{
    axios.get('http://localhost:5001/warehouseOwner/validateWarehouseOwner') .then((res) => {
     
  }).catch((error) => {
      if(error.message=='forbidden'){
navigate(" ")
      }
  });
  })

  const [state,setState]=useState({
    file:null
  })
 const handleFile = (e) => {

  let file = e.target.files[0]
  setState({file:file})
  }
const handleUpload = (e) =>{

  let file=state.file
  let formdata=new FormData()
  formdata.append('file',file)
  formdata.append('name','sana')

  console.log(state,"THE STATE ----$$$$")


axios({
  url:'http://localhost:5001/warehouseOwner/image',
  method:"POST",
  headers:{
    authorization:'your token'
  },
  data:formdata
}).then((res)=>{

})}

  const [warehouse, setWarehouse] = useState({
    name: "",
    space: "",
  
    type:"",
    pricePerDay: 0,
    description: "",
    isFireSafe: false,
    isSecurityCameras: false,
    isAirConditioning: false,
    isWorkers: false,
    });
    const handleAddWarehouse=(e)=>{
        addWarehouse(warehouse);
        handleUpload();
      }
  return (
    <div>
        <div className='row justify-content-center mt-5'>
   <h1 style={{color:'#54d494'}} className='text-center '>Post Your Space</h1>
        </div>
        <div className='row justify-content-center mt-5'>
        <Card style={{ width: '65rem' }}>
      
      <Card.Body>
      <FloatingLabel
        controlId="floatingInput"
        label="Warehouse Name"
        className="mb-3"
      >
        <Form.Control value={warehouse.name} 
    onChange={(e) => setWarehouse({...warehouse, name: e.target.value })}   placeholder="Warehouse Name" required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Space For Warehouse" className="mb-3">
        <Form.Control  value={warehouse.space} 
    onChange={(e) => setWarehouse({...warehouse, space: e.target.value })}  placeholder="Space For Warehouse" />
      </FloatingLabel>
      {/* <FloatingLabel
        controlId="floatingInput"
        label="Date Available"
        className="mb-3"
      >
        <Form.Control  value={warehouse.datesAvailable} 
    onChange={(e) => setWarehouse({...warehouse, datesAvailable: e.target.value })} type="date" placeholder="Date Available" />
      </FloatingLabel> */}
      {/* value={warehouse.type} 
    onChange={(e) => setWarehouse({...warehouse, type: e.target.value })} placeholder="Warehouse Type"  */}
      <FloatingLabel controlId="floatingPassword" label="Warehouse Type" className="mb-3">
      <Form.Select value={warehouse.type} 
    onChange={(e) => setWarehouse({...warehouse, type: e.target.value })} placeholder="Warehouse Type"  aria-label="Default select example">
     
      <option value="Public Warehouse">Public Warehouse</option>
      <option value="Private Warehouse">Private Warehouse</option>
      <option value="Smart Warehouse">Smart Warehouse</option>
      <option value="Cooperative Warehouse">Cooperative Warehouse</option>
      <option value="Consolidated Warehouse">Consolidated Warehouse</option>
      <option value="Bonded Warehouse">Bonded Warehouse</option>
      <option value="Government Warehouse">Government Warehouse</option>
      <option value="Cold Storage Warehouse">Cold Storage Warehouse</option>
      <option value="On-Demand Warehouse">On-Demand Warehouse</option>
      <option value="Distribution Centers">Distribution Centers</option>
    </Form.Select>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Price"
        className="mb-3"
      >

        <Form.Control value={warehouse.pricePerDay} 
    onChange={(e) => setWarehouse({...warehouse, pricePerDay: e.target.value })} className="mb-3" placeholder="Price" />
      </FloatingLabel>
      <Accordion className="mb-3" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Choose Your location</Accordion.Header>
        <Accordion.Body>
        <Figure.Image
        width={'100%'}
        
     
        src={require("../../../src/Assets/gsmarena_004.jpg")}
      />
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
      <FloatingLabel className="mb-3" controlId="floatingPassword" label="Description">
        <Form.Control  value={warehouse.description} 
    onChange={(e) => setWarehouse({...warehouse, description: e.target.value })} className="mb-3" style={{height:'100px'}} placeholder="Description" />
      </FloatingLabel>
      <Form>
      <Form.Check 
       value={warehouse.isFireSafe} 
       onChange={(e) => setWarehouse({...warehouse, isFireSafe: e.target.checked})}
        type="checkbox"
        id="custom-switch"
        label="Fire Safety"
      />
       <Form.Check 
        value={warehouse.isSecurityCameras} 
        onChange={(e) => setWarehouse({...warehouse, isSecurityCameras: e.target.checked })}
        type="checkbox"
        id="custom-switch"
        label="Security Cameras"
      />
     
       <Form.Check 
        value={warehouse.isAirConditioning} 
        onChange={(e) => setWarehouse({...warehouse, isAirConditioning: e.target.checked})}
        type="checkbox"
        id="custom-switch"
        label="Air Conditioning"
      />
       <Form.Check 
        value={warehouse.isWorkers} 
        onChange={(e) => setWarehouse({...warehouse, isWorkers: e.target.checked })}
        type="checkbox"
        id="custom-switch"
        label="Workers"
      /></Form>
      <input type='file' onChange={handleFile}></input>
      
        <Button onClick={handleAddWarehouse} className='mt-3' style={{backgroundColor:'#54d494',borderColor:'#54d494'}} type="submit"  variant="primary">Upload Space</Button>
      </Card.Body>
    </Card>
        </div>
  </div>
  )
}

export default PostNewWarehouse