import React, {useState} from 'react' 
 import Row from 'react-bootstrap/Row';  
 import Button from 'react-bootstrap/Button';  
 import Form from 'react-bootstrap/Form';  
 import InputGroup from 'react-bootstrap/InputGroup'; 
 import ui from '../../themes'

 import {AddWarehouseOwnerByAdmin} from '../../Services/AddWarehouseOwnerByAdmin';

 function AddWarehouseOwner(props) { 
     const [warehouseOwner, setWarehouseOwner] = useState({ 
     userName: "", 
     email: "", 
     password:"", 
     }); 

     const handleAddWarehouseOwnerByAdmin = async (e) => { 
         e.preventDefault() 


          const results=await AddWarehouseOwnerByAdmin(warehouseOwner); 
             props.addAction(results); 
          props.closeAction();  

     }


   return ( 

     <div> 

             <Row className="align-items-center">  
         <Row xs="auto">  
           <Form.Label htmlFor="inlineFormInput" visuallyHidden>  
             Name  
           </Form.Label>  
           <InputGroup   className="mb-2"> 
           <Form.Control  style={{backgroundColor:`${ui.searchesInput}` , color:`${ui.normalText}` , borderColor:`${ui.borders}`}} 
             className="mb-2"  
             id="inlineFormInput"  
             placeholder="Username"  
             onChange={(e) => setWarehouseOwner({...warehouseOwner, userName: e.target.value })} 
           />  
           </InputGroup> 
         </Row>  
         <Row xs="auto">  
           <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>  
             Username  
           </Form.Label>  
           <InputGroup className="mb-2">  
             <InputGroup.Text>@</InputGroup.Text>  
             <Form.Control  style={{backgroundColor:`${ui.searchesInput}` , color:`${ui.normalText}`,borderColor:`${ui.borders}`}}
             id="inlineFormInputGroup"  
             placeholder="email" 
             onChange={(e) => setWarehouseOwner({...warehouseOwner, email: e.target.value })} 
             />  
           </InputGroup>  
         </Row>  

         <Row xs="auto">  
         <Form.Label htmlFor="inlineFormInput" visuallyHidden>  
             Name  
           </Form.Label>  
           <InputGroup className="mb-2"> 
           <Form.Control  style={{backgroundColor:`${ui.searchesInput}` , color:`${ui.normalText}`,borderColor:`${ui.borders}`}}
             className="mb-2"  
             id="inlineFormInput"  
             placeholder="password" 
             type='password'

             onChange={(e) => setWarehouseOwner({...warehouseOwner, password: e.target.value })} 
           />  
           </InputGroup> 
         </Row>  
         <Row xs="auto" className='justify-content-center'>  
           <Button onClick={(e)=>{handleAddWarehouseOwnerByAdmin(e)}} type="submit" className="mb-2" style={{backgroundColor:`${ui.Buttons}` , color:`${ui.normalText}`}}>  
             Submit  
           </Button>  
         </Row>  
       </Row> 

     </div> 
   ) 
 } 

 export default AddWarehouseOwner