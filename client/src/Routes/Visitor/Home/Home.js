import React from 'react'
import VisitorNavbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import bg from "../../../Assets/warehouseimg.jpg"
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
// import "./Home.css";


function Home() {
  return (
    <>
    
    <VisitorNavbar/>


      <Card className="bg-dark text-white">
      <Card.Img src={require('../../../Assets/warehouseimg.jpg')} alt="Card image" style={{height:"30rem"}}/>
      <Card.ImgOverlay>

        <Row className='justify-content-center mt-3'>

        
        <Col className='col-4'></Col>
        <Col className='col-4 mt-5'>
        <h2>Search For a Space</h2>
        <InputGroup >
          <FormControl
            placeholder="Search"
          />
          <Button style={{backgroundColor:'#54d494', borderColor:'#54d494'}}>
            Search
          </Button>
        </InputGroup>
        
        </Col>
        <Col className='col-4'></Col>

        </Row>
      

        {/* <Card.Title>Card title</Card.Title>
        <Card.Text>
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </Card.Text>
        <Card.Text>Last updated 3 mins ago</Card.Text> */}

      </Card.ImgOverlay>
    </Card>

   

      
      
    

    





    <Footer/>
    
    </>
    
  )
}

export default Home