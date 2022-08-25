import React, { useEffect } from 'react'
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
import landingImg from '../../../Assets/homePageBg.jpg'
import SearchBar from '../../../Components/SearchBar/SearchBar'
import ui from '../../../themes'



function Landing() {



  return (
    <>

      {/* <VisitorNavbar/> */}


      <ScrollContainer className="bg-success col-12">

        <ScrollPage  >
          <Animator>


            <div>
              <img className='col-12 position-relative' src={landingImg}></img>
              <div style={{ position: 'absolute', top: '30%', left: '30%', color: 'white' }} >
                <p style={{ fontSize: '4.5rem', fontWeight:'bold' }}>Search For A Space</p>
                <div className='col-6 ms-3'>
                                 {/* TODO: add search Bar */}   
                </div>

              </div>

            </div>

          </Animator>
        </ScrollPage>



        <ScrollPage>
          <Animator>

            <Container>

              <Row className='parrr'>
                <Col className='col-lg-7 col-sm-11'>
                  <p style={{color:`${ui.normalText}`}} >Warehousing is the process of storing physical inventory for sale or distribution. Warehouses are used by all different types of businesses that need to temporarily store products in bulk before either shipping them to other locations or individually to end consumers.</p>
                </Col>
                <Col className='col-lg-4 col-sm-12'>
                  <img src={require('../../../Assets/Logistics-pana 1.png')} />
                </Col>
              </Row>


              <Row className='parrr'>
                <Col className='col-lg-4 col-sm-12'>


                  <img src={require('../../../Assets/Container ship-cuate 1.png')} />

                </Col>

                <Col className='col-lg-8 col-sm-12'>

                  <p style={{color:`${ui.normalText}`}} >Warehousing is the process of storing physical inventory for sale or distribution. Warehouses are used by all different types of businesses that need to temporarily store products in bulk before either shipping them to other locations or individually to end consumers.</p>

                </Col>
              </Row >

              <Row className='parrr'>
                <Col className='col-lg-8 col-sm-12'>

                  <p style={{color:`${ui.normalText}`}} >Warehousing is the process of storing physical inventory for sale or distribution. Warehouses are used by all different types of businesses that need to temporarily store products in bulk before either shipping them to other locations or individually to end consumers.</p>

                </Col>
                <Col className='col-lg-4 col-sm-12'>

                  <img src={require('../../../Assets/Logistics-amico2.png')} />

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