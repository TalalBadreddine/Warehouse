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
import Card from 'react-bootstrap/Card'; 
import { Outlet } from 'react-router-dom';

 
 
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion"; 
import video from '../../../Assets/video.mp4' 

 import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./LandingStyles.js";
 
function Landing() { 
 
 
 
  return ( 
     
 
<div className="header"> 
          <div style={{height:'600px',position:'relative'}}  className="slider"> 
             <video loop autoPlay width={'100%'} height={800} style={{marginBottom:'1%'}} controls><source  src ={`${video}`} type="video/mp4" /> </video>
           <div  style={{position:'absolute',top:'0', height:'800px', width:'100%',backgroundColor:'rgba(0, 0, 0, 0.7)',backgroundSize:'300px 100px'}}> <p style={{ padding: '270px', textAlign: 'center',color:'white',fontStyle:'italic',fontSize:'60px'}}>A safe <span style={{color:'#4177b2'}}
           > warehouse</span> is a productive warehouse. </p></div> 
           </div> 
           <br></br><br></br><br></br>
           <div style={{backgroundColor:'white'}} className='row'>
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
    <Card.Img variant="top"src={`${img2}`} />
    <Card.Body>
        <Card.Title>RELY ON EXPERT ADVICE AND BEST PRACTICES FOR YOUR SEARCH</Card.Title>
      
     
      </Card.Body>
    </Card></div>
    <div className='col-1'></div>
    <div className='col-2'> <Card className='m-3' style={{ width: '20rem '}}>
    <Card.Img variant="top"src={`${img3}`} />
      <Card.Body>
        <Card.Title>RELY ON EXPERT ADVICE AND BEST PRACTICES FOR YOUR SEARCH</Card.Title>
      
     
      </Card.Body>
    </Card></div>
          </div>
          <Timeline style={{backgroundColor:'white'}} position="alternate">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          9:30 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '40px', px: 2 }}>
          <Typography variant="h6" component="span">
            Eat
          </Typography>
          <Typography>Because you need strength</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          10:00 am
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
            Code
          </Typography>
          <Typography>Because it&apos;s awesome!</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            <HotelIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '40px', px: 2 }}>
          <Typography variant="h6" component="span">
            Sleep
          </Typography>
          <Typography>Because you need rest</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          <TimelineDot color="secondary">
            <RepeatIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '40px', px: 2 }}>
          <Typography variant="h6" component="span">
            Repeat
          </Typography>
          <Typography>Because this is the life you love!</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline> 
    
   
  
    
    <div className='row'>
        
    <Box style={{ position:"relative" }}>
      <h1 style={{ color: "#4177b2", 
                   textAlign: "center", 
                   marginTop: "-50px" }}>
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