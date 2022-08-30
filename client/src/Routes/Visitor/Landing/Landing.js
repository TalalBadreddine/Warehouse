import React from 'react'
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

import people1 from '../../../Assets/people1.jpg'
import people2 from '../../../Assets/people2.jpg'
import people3 from '../../../Assets/people3.jpg'

import Card from 'react-bootstrap/Card';
import ui from '../../../themes'
import { Outlet } from 'react-router-dom';
import { FaQuoteRight } from 'react-icons/fa'

import TextField from '@mui/material/TextField';

import video from '../../../Assets/video.mp4'

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
  const comments = [
    {
      userName: 'Johnny Haga',
      content: 'Testing the comment section i am here to add a comment testing the comment section i am here to add a comment testing the comment section i am here to add a comment',
      img: people1
    }, {
      userName: 'Linda Bybee',
      content: 'Testing the comment section i am here to add a comment testing the comment section i am here to add a comment testing the comment section i am here to add a comment',
      img: people3
    }, {
      userName: 'Goldie Vasquez',
      content: 'Testing the comment section i am here to add a comment testing the comment section i am here to add a comment testing the comment section i am here to add a comment',
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
      <div style={{ backgroundColor: 'white' }} className='row'>
        <div className='col-1 m-5'></div>
        <div className='col-2'>
          <Card className='m-3' style={{ width: '20rem' }}>
            <Card.Img variant="top" src={`${img1}`} />
            <Card.Body>
              <Card.Title>RELY ON EXPERT ADVICE AND BEST PRACTICES FOR YOUR SEARCH</Card.Title>


            </Card.Body>
          </Card>
        </div>
        <div className='col-1'></div>
        <div className='col-2'> <Card className='m-3' style={{ width: '20rem' }}>
          <Card.Img variant="top" src={`${img2}`} />
          <Card.Body>
            <Card.Title>RELY ON EXPERT ADVICE AND BEST PRACTICES FOR YOUR SEARCH</Card.Title>


          </Card.Body>
        </Card></div>
        <div className='col-1'></div>
        <div className='col-2'> <Card className='m-3' style={{ width: '20rem ' }}>
          <Card.Img variant="top" src={`${img3}`} />
          <Card.Body>
            <Card.Title>RELY ON EXPERT ADVICE AND BEST PRACTICES FOR YOUR SEARCH</Card.Title>


          </Card.Body>
        </Card></div>
      </div>


      <div style={{ backgroundColor: 'white' }} >

      <Reveal>
        <div className='col-7 pb-5 m-auto pt-5'>
          <div className='col-2 m-auto text-center'><p style={{ color: `blue` }}>Rent A Warehouse</p>

            <hr style={{ backgroundColor: ' #FFD700', height: '5px', border: 'none' }}></hr>
          </div>
          <div>
            <p className='text-center' style={{ fontWeight: 'bolder', fontSize: '3rem' }}>Warehouse Renting Steps</p>
          </div>

        </div>
        </Reveal>

        <Reveal>
        <Timeline style={{ backgroundColor: 'white' }} position="alternate">
          <TimelineItem className='mt-2'>
            <TimelineOppositeContent
              align="right"
              variant="body2"
              color="text.secondary">
              <div style={{ ...sideParagraphs }} className='col-10 m-auto text-center'>
                <h5>Create a account</h5>
                <p>Before you start you must create a account, and provide us with ur personal info, Before you start you must create a account.</p>
              </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                <FastfoodIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6" component="span">
              </Typography>
              <Typography></Typography>
            </TimelineContent>
          </TimelineItem>



          <TimelineItem>
            <TimelineOppositeContent
              align="right"
              variant="body2"
              color="text.secondary"
            >

              <div style={{ ...sideParagraphs }} className='py-2 px-2 col-10 m-auto text-center'>
                <h5>Create a account</h5>
                <p>Before you start you must create a account, and provide us with ur personal info, Before you start you must create a account.</p>
              </div>

            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <FastfoodIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
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
              <div style={{ ...sideParagraphs }} className='py-2 px-2 col-10 m-auto text-center'>
                <h5>Create a account</h5>
                <p>Before you start you must create a account, and provide us with ur personal info, Before you start you must create a account.</p>
              </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <LaptopMacIcon />
              </TimelineDot>
              <TimelineConnector />
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
              <div style={{ ...sideParagraphs }} className='py-2 px-2 col-10 m-auto text-center'>
                <h5>Create a account</h5>
                <p>Before you start you must create a account, and provide us with ur personal info, Before you start you must create a account.</p>
              </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" variant="outlined">
                <HotelIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            </TimelineSeparator>
            <TimelineContent>
            </TimelineContent>
          </TimelineItem>


          <TimelineItem className='mb-5'>
            <TimelineOppositeContent
              variant="body2"
              color="text.secondary"

            >
              <div style={{ ...sideParagraphs }} className='py-2 px-2 col-10 m-auto text-center'>
                <h5>Create a account</h5>
                <p>Before you start you must create a account, and provide us with ur personal info, Before you start you must create a account.</p>
              </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
              <TimelineDot color="secondary">
                <RepeatIcon />
              </TimelineDot>
              {/* <TimelineConnector /> */}
            </TimelineSeparator>
            <TimelineContent sx={{ py: '40px', px: 2 }}>
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
                      <p style={{fontSize:'1.2rem'}}>{comment.content}</p>
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
          <div className='col-2 m-auto'><p style={{ color: `blue` }}>Rent your space</p>

            <hr style={{ backgroundColor: ' #FFD700', height: '5px', border: 'none' }}></hr>
          </div>
          <div>
            <p className='text-center' style={{ fontWeight: 'bolder', fontSize: '3rem' }}>Become a Warehouse Rentor Supplier</p>
            <div className='d-flex  justify-content-center col-12'>
              <Button style={{ backgroundColor: `${ui.lightBg}`, width: '12rem', height: '3rem', fontSize: '1.2rem' }} >List Your Space</Button>
            </div>
          </div>

        </div>
        </Reveal>


        <div className='col-8 m-auto mt-5 mb-5 bg-primary'>
          <h1 className='text-center'>Why become a warehouse Rentor</h1>
        </div>

        <div className='col-6 m-auto pb-5'>
          <div className='mb-3'>
            <h3>Get In Touch</h3>
          </div>
          <div>

            <div className='d-flex justify-content-between'>
              <TextField className='col-5' style={{color:'black !important'}} id="outlined-basic" label="First Name" variant="outlined" />

              <TextField className='col-6' id="outlined-basic" label="Last Name" variant="outlined" />

            </div>

            <div className='mt-3 d-flex justify-content-between'>
              <TextField className='col-5' style={{color:'black !important'}} id="outlined-basic" label="Email" variant="outlined" />

              <TextField className='col-6' id="outlined-basic" label="Phone Number" variant="outlined" />

            </div>

            <div className='mt-3'>
            <TextField className='col-12' id="outlined-basic" label="Subject" variant="outlined" />

            </div>
            <div className='mt-3'>
            <textarea placeholder='Content...' className='col-12 px-2 py-1' style={{height:'140px', borderRadius:'10px', border:'.4px solid gray'}} />

            </div>

            <div className='d-flex justify-content-end mt-2'>
              <Button className='col-3'>Send</Button>
            </div>

          </div>
        </div>


      </div>
      <div className='row'>

        <Box style={{ position: "relative" }}>
          <h1 style={{
            color: "#4177b2",
            textAlign: "center",
            marginTop: "-50px"
          }}>
            GeeksforGeeks: A Computer Science Portal for Geeks
          </h1>
          <Container>
            <Row>
              <Column>
                <Heading>About Us</Heading>
                <FooterLink href="#">Aim</FooterLink>
                <FooterLink href="#">Vision</FooterLink>
                <FooterLink href="#">Testimonials</FooterLink>
              </Column>
              <Column>
                <Heading>Services</Heading>
                <FooterLink href="#">Writing</FooterLink>
                <FooterLink href="#">Internships</FooterLink>
                <FooterLink href="#">Coding</FooterLink>
                <FooterLink href="#">Teaching</FooterLink>
              </Column>
              <Column>
                <Heading>Contact Us</Heading>
                <FooterLink href="#">Uttar Pradesh</FooterLink>
                <FooterLink href="#">Ahemdabad</FooterLink>
                <FooterLink href="#">Indore</FooterLink>
                <FooterLink href="#">Mumbai</FooterLink>
              </Column>
              <Column>
                <Heading>Social Media</Heading>
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

  );
}

export default Landing