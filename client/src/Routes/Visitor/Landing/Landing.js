import React from 'react'
import VisitorNavbar from '../../../Components/NavigationBar/NavigationBar'
import Footer from '../../../Components/Footer/Footer'
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"

import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'

import './Landing.css'
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";




function Landing() {




  const FadeUp = batch(Fade(), Move(), Sticky());
  const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
  return (
    <>
    
    {/* <VisitorNavbar/> */}
      
  
      <ScrollContainer className="bg-success col-12">

        <ScrollPage  >
        <Animator animation={FadeOut(1000,-500)}>
      
      <Card className="bg-dark text-white" style={{width: '100%',height: '95vh', margin: "10px 0",backgroundRepeat:'no-repeat'}}>
      <Card.Img src={require('../../../Assets/modern.webp')} alt="Card image" style={{height:"95vh",resizeMode: 'cover',flex: 1, opacity:"0.7"}}/>
      <Card.ImgOverlay>

        <Row className='justify-content-center mt-3'>

        
        <Col className='col-4'></Col>
        <Col className='col-4 mt-5'>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <h1> Search for a Space</h1>
          
        </div>
        <InputGroup >
          <FormControl
            placeholder="Search"
          />
          <Button onClick={()=>{window.scrollTo({bottom:0,behavior:'smooth'})}} style={{backgroundColor:'#54d494', borderColor:'#54d494'}}>
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
    
    </Animator>
        </ScrollPage>



        <ScrollPage>
         <Animator animation={MoveIn(-1000,0)}>
          
      <Container>

      <Row className='parrr'>
        <Col className='col-lg-8 col-sm-12'>
            <p>Warehousing is the process of storing physical inventory for sale or distribution. Warehouses are used by all different types of businesses that need to temporarily store products in bulk before either shipping them to other locations or individually to end consumers.</p>
        </Col>
        <Col className='col-lg-4 col-sm-12'> 
        <img src={require('../../../Assets/Logistics-pana 1.png')}/>
          </Col>
      </Row>


        <Row className='parrr'>
        <Col className='col-lg-4 col-sm-12'>

          
          <img src={require('../../../Assets/Container ship-cuate 1.png')}/>
        
        </Col>
        
        <Col className='col-lg-8 col-sm-12'>
        
        <p>Warehousing is the process of storing physical inventory for sale or distribution. Warehouses are used by all different types of businesses that need to temporarily store products in bulk before either shipping them to other locations or individually to end consumers.</p>
        
        </Col>
      </Row >

          <Row className='parrr'>
        <Col className='col-lg-8 col-sm-12'>
          
        <p>Warehousing is the process of storing physical inventory for sale or distribution. Warehouses are used by all different types of businesses that need to temporarily store products in bulk before either shipping them to other locations or individually to end consumers.</p>
        
        </Col>
        <Col className='col-lg-4 col-sm-12'>
        
        <img src={require('../../../Assets/Logistics-amico2.png')}/>
        
        </Col>
      </Row>

      
    </Container>
    
    </Animator>
        </ScrollPage>
      </ScrollContainer>

     
    

    {/* <Footer/> 
    Assets/Logistics-amico2.png*/}
    
    </>
    
  )
}

export default Landing