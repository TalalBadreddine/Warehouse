import React, { useState } from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import img1 from '../../../Assets/warehouseImage.jpg'
import img2 from '../../../Assets/3.jpg'
import img3 from '../../../Assets/2.jpg'
import { Button } from 'react-bootstrap';
import Reveal from 'react-reveal/Reveal';
import css from '../../../index.css'
import people1 from '../../../Assets/people1.jpg'
import people2 from '../../../Assets/people2.jpg'
import people3 from '../../../Assets/people3.jpeg'
import { BiLogInCircle } from 'react-icons/bi'
import Card from 'react-bootstrap/Card';
import ui from '../../../themes'
import { Outlet } from 'react-router-dom';
import { FaQuoteRight } from 'react-icons/fa'
import { Alert } from 'react-bootstrap';

import TextField from '@mui/material/TextField';

import video from '../../../Assets/video.mp4'
import { FaSearch } from 'react-icons/fa';
import { AiOutlineCheck } from 'react-icons/ai';
import { BiGitPullRequest } from 'react-icons/bi';
import { MdOutlinePayment } from 'react-icons/md'
import axios from 'axios'


import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./LandingStyles.js";

const sideParagraphs = {

  backgroundColor: `#eeeeee`,
  color: `black`,
  padding: '20px'

}

function Landing() {

  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    content: ''
  })

  const [formStatus, setFormStatus] = useState({
    variant:'success',
    content: null,
  })

  const handleContactFormChange = (event) => {
    setContactForm({ ...contactForm, [event.target.name]: event.target.value })
    
  }

  const sendContactAdmin = () => {

    if (contactForm.content.trim() == '') {
      setFormStatus({...formStatus, ['variant']:'danger', ['content']:'Content is Empty !'})
      setTimeout(() => {
        setFormStatus({...formStatus,['content']:null })
      }, 2000)
      return
    }

    axios.post('/contactAdmin', contactForm).then((results) => {
      
      setFormStatus({...formStatus, ['variant']:'success', ['content']:'Thanks for adding feedback!'})
      setTimeout(() => {
        setFormStatus({...formStatus,['content']:null })
      }, 2000)
    }).catch((err) => {
      console.log(`error ${err}`)
    })

  }

  const comments = [
    {
      userName: 'Mohamad Ashkar',
      content: 'For decades i have been searching for a website that would make my business work easier and more professional. for the first time, im genuinely proud of such a website.',
      img: people1
    }, {
      userName: 'Maya Saadeh',
      content: 'Such a great website that helped me alot , its user friendly and everybody can use it easily. It gave my businesses flexibility when i really need it.',
      img: people3
    }, {
      userName: 'Joelle Njeim',
      content: 'The rented warehouse space allows companies to expand without having to invest in a new building and eliminates the added expenses.',
      img: people2
    }
  ]


  return (


    <div className="header">
      <div style={{ height: '600px', position: 'relative' }} className="slider">
        <video loop autoPlay width={'100%'} height={800} style={{ marginBottom: '1%' }} controls><source src={`${video}`} type="video/mp4" /> </video>
        <div style={{ position: 'absolute', top: '0', height: '800px', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', backgroundSize: '300px 100px' }}> <p style={{ padding: '270px', textAlign: 'center', color: 'white', fontStyle: 'italic', fontSize: '60px' }}>A safe <span style={{ color: '#4177b2' }}
        > warehouse</span> is a productive warehouse. </p></div>
      </div>
      <br></br><br></br><br></br>
      <div style={{ backgroundColor: `${ui.backgroundColor}` }} className='row'>
        <div className='col-1 m-5'></div>
        <div className='col-2'>
          <Card className='m-3' style={{ width: '20rem', boxShadow: `4px 4px 4px ${ui.borders}` }}>
            <Card.Img variant="top" src={`${img1}`} />
            <Card.Body>
              <Card.Title>TIPS ON HOW TO CHOOSE A SUITABLE WAREHOUSE RENTAL ?</Card.Title>


            </Card.Body>
          </Card>
        </div>
        <div className='col-1'></div>
        <div className='col-2'> <Card className='m-3' style={{ width: '20rem', boxShadow: `4px 4px 4px ${ui.borders}` }}>
          <Card.Img variant="top" src={`${img2}`} />
          <Card.Body>
            <Card.Title>WANT TO KNOW WHY CHOOSE A LOGISTICS WAREHOUSE WITH US?</Card.Title>


          </Card.Body>
        </Card></div>
        <div className='col-1'></div>
        <div className='col-2'> <Card className='m-3' style={{ width: '20rem ', boxShadow: `4px 4px 4px ${ui.borders}` }}>
          <Card.Img variant="top" src={`${img3}`} />
          <Card.Body>
            <Card.Title>RELY ON EXPERT ADVICE AND BEST PRACTICES FOR YOUR SEARCH</Card.Title>


          </Card.Body>
        </Card></div>
      </div>


      <div style={{ backgroundColor: `${ui.backgroundColor}` }} >

        <Reveal>
          <div className='col-7 pb-5 m-auto pt-5'>
            <div>
              <p className='text-center' style={{ color: `${ui.normalText}`, fontWeight: 'bolder', fontSize: '3rem' }}>Warehouse Renting Steps</p>
            </div>

          </div>
        </Reveal>

        <Reveal>
          <Timeline style={{ backgroundColor: `${ui.backgroundColor}` }} position="alternate">
            <TimelineItem className='mt-2'>
              <TimelineOppositeContent
                align="right"
                variant="body2"
                color="text.secondary">
                <div style={{ ...sideParagraphs, backgroundColor: `${ui.borders}`, borderRadius: '8px', boxShadow: `2px 2px 2px ${ui.Buttons}` }} className='col-10 m-auto text-center'>
                  <h5 style={{ color: `${ui.backgroundColor}` }}>Create an account</h5>
                  <p style={{ color: `${ui.normalText}` }}>Before you start you must create an account, and provide us with ur personal info.</p>
                </div>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot style={{ backgroundColor: 'gray' }}>
                  <BiLogInCircle />
                </TimelineDot>
                <TimelineConnector style={{ backgroundColor: 'gray' }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '50px', px: 2 }}>
                <Typography variant="h6" component="span">
                </Typography>
                <Typography></Typography>
              </TimelineContent>
            </TimelineItem>



            <TimelineItem className='mt-2'>
              <TimelineOppositeContent
                align="right"
                variant="body2"
                color="text.secondary"
              >

                <div style={{ ...sideParagraphs, backgroundColor: `${ui.borders}`, borderRadius: '8px', boxShadow: `2px 2px 2px ${ui.Buttons}` }} className=' col-10 m-auto text-center'>
                  <h5 style={{ color: `${ui.backgroundColor}` }}>Search for a warehouse</h5>
                  <p style={{ color: `${ui.normalText}` }}>Search for your suitable warehouse by using the filters: size, type, dates available..</p>
                </div>

              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector style={{ backgroundColor: 'gray' }} />
                <TimelineDot style={{ backgroundColor: 'gray' }}>
                  <FaSearch />
                </TimelineDot>
                <TimelineConnector style={{ backgroundColor: 'gray' }} />
              </TimelineSeparator >
              <TimelineContent >
                <Typography variant="h6" component="span">
                </Typography>
                <Typography></Typography>
              </TimelineContent>
            </TimelineItem>






            <TimelineItem>
              <TimelineOppositeContent
                variant="body2"
                color="text.secondary"
              >
                <div style={{ ...sideParagraphs, backgroundColor: `${ui.borders}`, borderRadius: '8px', boxShadow: `2px 2px 2px ${ui.Buttons}` }} className=' col-10 m-auto text-center'>
                  <h5 style={{ color: `${ui.backgroundColor}` }}>Check if the warehouse is available</h5>
                  <p style={{ color: `${ui.normalText}` }}>By clicking on the warehouse, you can check the dates and availability of each and every warehouse.</p>
                </div>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector style={{ backgroundColor: 'gray' }} />
                <TimelineDot style={{ backgroundColor: 'gray' }}>
                  <AiOutlineCheck />
                </TimelineDot >
                <TimelineConnector style={{ backgroundColor: 'gray' }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '40px', px: 2 }}>
                <Typography variant="h6" component="span">

                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent
                variant="body2"
                color="text.secondary"
              >
                <div style={{ ...sideParagraphs, backgroundColor: `${ui.borders}`, borderRadius: '8px', boxShadow: `2px 2px 2px ${ui.Buttons}` }} className=' col-10 m-auto text-center'>
                  <h5 style={{ color: `${ui.backgroundColor}` }}>Request an available warehouse </h5>
                  <p style={{ color: `${ui.normalText}` }}>Once you choose your suitable warehouse, you can click on the request button and wait untill the warehouseOwner approves. </p>
                </div>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector style={{ backgroundColor: 'gray' }} />
                <TimelineDot style={{ backgroundColor: 'gray' }}>
                  <BiGitPullRequest />
                </TimelineDot>
                <TimelineConnector style={{ backgroundColor: 'gray' }} />
              </TimelineSeparator>
              <TimelineContent>
              </TimelineContent>
            </TimelineItem>


            <TimelineItem className='mb-5'>
              <TimelineOppositeContent
                variant="body2"
                color="text.secondary"

              >
                <div style={{ ...sideParagraphs, backgroundColor: `${ui.borders}`, borderRadius: '8px', boxShadow: `2px 2px 2px ${ui.Buttons}` }} className=' col-10 m-auto text-center'>
                  <h5 style={{ color: `${ui.backgroundColor}` }}>Make the payment</h5>
                  <p style={{ color: `${ui.normalText}` }}>Once the warehouse owner approves on your request, you can make your payment.</p>
                </div>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector style={{ backgroundColor: 'gray' }} />
                <TimelineDot style={{ backgroundColor: 'gray' }}>
                  <MdOutlinePayment />
                </TimelineDot>
                {/* <TimelineConnector /> */}
              </TimelineSeparator>
              <TimelineContent sx={{ py: '30px', px: 2 }}>
                <Typography variant="h6" component="span">
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Reveal>

        <Reveal>
          <div className='col-12 m-auto ' style={{ backgroundColor: `${ui.lightBg}` }}>
            <div className='m-auto text-center pt-4' style={{ color: `${ui.bigTitle}` }}>
              <h1>Testimonials</h1>
            </div>
            <div className='d-flex justify-content-between px-5 pb-4'>
              {comments.map((comment) => {
                return (
                  <div className='col-3'>
                    <div className='mt-5 mb-2 my-3 col-12' style={{ backgroundColor: `${ui.lightBg}`, height: '300px', borderRadius: '20px', border: `1px solid ${ui.borders}` }}>
                      <div className='ms-4 mt-3'>
                        <FaQuoteRight size={42} color='white' className='mt-3'></FaQuoteRight>
                      </div>
                      <div className='mt-3 px-3 text-center' style={{ color: 'white' }}>
                        <p style={{ fontSize: '1.2rem' }}>{comment.content}</p>
                      </div>
                    </div>
                    <div className='d-flex mt-3'>
                      <div style={{ width: '56px', height: '56px', backgroundColor: `${ui.borders}`, borderRadius: '50%' }}  >
                        <img src={comment.img} alt='userImg' style={{ borderRadius: '50%', margin: '3px 3px' }} width='50px' height='50px'></img>
                      </div>
                      <h5 className='ms-2  mt-3' style={{ color: `${ui.normalText}` }}>{comment.userName}</h5>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>

        </Reveal>

        <Reveal>
          <div className='col-7 pb-5 m-auto mt-5'>
            <div>
              <p className='text-center' style={{ color: `${ui.normalText}`, fontWeight: 'bolder', fontSize: '3rem' }}>Become a Warehouse Renter Supplier</p>
              <div className='d-flex  justify-content-center col-12'>
                <Button style={{ backgroundColor: `${ui.lightBg}`, width: '12rem', height: '3rem', fontSize: '1.2rem' }} >List Your Space</Button>
              </div>
            </div>

          </div>
        </Reveal>

        <div style={{ color: `${ui.lightBg}`, border: '1px solid #027fff' }} className='col-8 m-auto mt-5 mb-5'>
          <div className='col-8 m-auto mt-5 mb-5'>
            <h1 style={{ color: `${ui.Buttons}` }} className='text-center'>Why become a warehouse Renter ?</h1>
          </div>

          <div className='col-8 m-auto mt-5 mb-5'>
            <h4 style={{ color: `${ui.borders}` }} className='text-center'>Availability of spaces</h4>
            <p style={{ color: `${ui.normalText}` }} >The rented warehouse space allows companies to expand without having to invest in a new building and eliminates the added expenses.</p>
          </div>

          <div className='col-8 m-auto mt-5 mb-5'>
            <h4 style={{ color: `${ui.borders}` }} className='text-center'>Flexibility</h4>
            <p style={{ color: `${ui.normalText}` }}>warehouse rentals give businesses flexibility when they need it. Businesses pay only for the space and services they use and not anything more.</p>
          </div>

          <div className='col-8 m-auto mt-5 mb-5'>
            <h4 style={{ color: `${ui.borders}` }} className='text-center'>Plenty of choices and varieties</h4>
            <p style={{ color: `${ui.normalText}` }}>When you rent a  warehouse you get a choose from a wide variety of existing locations, each with their own strategic advantages.</p>
          </div>
        </div>
        <div className='col-6 m-auto pb-5'>
          <div className='mb-3'>
            <h3 style={{ color: `${ui.normalText}` }}>Get In Touch</h3>
          </div>
          <div>

            <div className='d-flex justify-content-between'>
              <TextField onChange={(e) => { handleContactFormChange(e) }} name='firstName' className='col-5' style={{ color: 'white', borderColor: 'white', border: `2px solid ${ui.borders}`, borderRadius: '4px' }} id="outlined-basic" label="First Name" variant="outlined" />

              <TextField onChange={(e) => { handleContactFormChange(e) }} name='lastName' className='col-6' id="outlined-basic" style={{ color: 'white', borderColor: 'white', border: `2px solid ${ui.borders}`, borderRadius: '4px' }} label="Last Name" variant="outlined" />

            </div>

            <div className='mt-3 d-flex justify-content-between'>
              <TextField onChange={(e) => { handleContactFormChange(e) }} name='email' className='col-5' id="outlined-basic" style={{ color: 'white', borderColor: 'white', border: `2px solid ${ui.borders}`, borderRadius: '4px' }} label="Email" variant="outlined" />

              <TextField onChange={(e) => { handleContactFormChange(e) }} name='phoneNumber' className='col-6' id="outlined-basic" style={{ color: 'white', borderColor: 'white', border: `2px solid ${ui.borders}`, borderRadius: '4px' }} label="Phone Number" variant="outlined" />

            </div>

            <div className='mt-3'>
              <TextField onChange={(e) => { handleContactFormChange(e) }} name='subject' className='col-12' id="outlined-basic" style={{ color: 'white', borderColor: 'white', border: `2px solid ${ui.borders}`, borderRadius: '4px' }} label="Subject" variant="outlined" />

            </div>
            <div className='mt-3'>
              <textarea onChange={(e) => { handleContactFormChange(e) }} name='content' placeholder="Content..." className='col-12 px-2 py-1' style={{ height: '140px', borderRadius: '4px', border: `2px solid ${ui.borders}`, color: 'white ', backgroundColor: `${ui.backgroundColor}` }} />

            </div>

            <div className='d-flex justify-content-end mt-2'>
              <Button onClick={() => { sendContactAdmin() }} className='col-3'>Send</Button>
            </div>

            {formStatus.content && <Alert variant={formStatus.variant} className='mt-3'>
            {formStatus.content}
            </Alert>}

          </div>
        </div>


      </div>

      <div style={{ backgroundColor: `${ui.lightBg}` }}>
        <div className='row' >

          <Box style={{ position: "relative", backgroundColor: `${ui.lightBg}` }}>

            <Container >
              <Row>
                <Column>
                  <Heading style={{ color: `${ui.borders}` }}>About Us</Heading>
                  <FooterLink href="#">Aim</FooterLink>
                  <FooterLink href="#">Vision</FooterLink>
                  <FooterLink href="#">Testimonials</FooterLink>
                </Column>
                <Column>
                  <Heading style={{ color: `${ui.borders}` }}>Services</Heading>
                  <FooterLink href="#">Rent warehouse</FooterLink>
                  <FooterLink href="#">Post warehouse</FooterLink>
                  <FooterLink href="#">Create an account</FooterLink>

                </Column>
                <Column>
                  <Heading style={{ color: `${ui.borders}` }}>Contact Us</Heading>
                  <FooterLink href="#">Add Feedback</FooterLink>
                  <FooterLink href="#">Contact Admin</FooterLink>
                  <FooterLink href="#">Contact Warehouse Owner</FooterLink>

                </Column>
                <Column>
                  <Heading style={{ color: `${ui.borders}` }}>Social Media</Heading>
                  <FooterLink href="#">
                    <i className="fab fa-facebook-f">
                      <span style={{ marginLeft: "10px" }}>
                        Facebook
                      </span>
                    </i>
                  </FooterLink>
                  <FooterLink href="#">
                    <i className="fab fa-instagram">
                      <span style={{ marginLeft: "10px" }}>
                        Instagram
                      </span>
                    </i>
                  </FooterLink>
                  <FooterLink href="#">
                    <i className="fab fa-twitter">
                      <span style={{ marginLeft: "10px" }}>
                        Twitter
                      </span>
                    </i>
                  </FooterLink>
                  <FooterLink href="#">
                    <i className="fab fa-youtube">
                      <span style={{ marginLeft: "10px" }}>
                        Youtube
                      </span>
                    </i>
                  </FooterLink>
                </Column>
              </Row>
            </Container>
          </Box>
        </div>
      </div>
    </div>

  );
}

export default Landing