import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link } from 'react-router-dom';


function Navigationbar() {
  const [currentPage, setCurrentPage] = useState(-1)

  return (
   <>
  

       <Navbar bg="white" expand="lg" style={{ color: "black" }} >
      <Container fluid>
        <Navbar.Brand href="#Logo">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
            <Nav></Nav>
          <Nav
            className="justify-content-end "
            style={{ width : "100%"}}
            navbarScroll
          >

            <Nav.Link> <Link to={''} style={{ color: "black", textDecoration: 'none' }} className={currentPage == 0 && 'font-weight-bold bg-primary'} > Home </Link> </Nav.Link>
            <Nav.Link> <Link to={'/ListSpace'} style={{ color: "black", textDecoration: 'none' }} className={currentPage == 1 && 'font-weight-bold bg-primary'} > Find a space </Link> </Nav.Link>
            <Nav.Link> <Link to={'/Search'} style={{ color: "black", textDecoration: 'none' }} className={currentPage == 2 && 'font-weight-bold bg-primary'} > About us </Link> </Nav.Link>
            <Nav.Link> <Link to={'/login'} style={{ color: "black", textDecoration: 'none' }} className={currentPage == 3 && 'font-weight-bold bg-primary'} > Sign-in </Link> </Nav.Link>

            {/* <Nav.Link href="#List your space" style={{ color: "black" }}> List your space</Nav.Link>
            <Nav.Link href="#Find a space" style={{ color: "black" }}> Find a space</Nav.Link>
             <Nav.Link href="/About Us" style={{ color: "black" }}> About Us</Nav.Link> 
              <Nav.Link href="/login" style={{ color: "black" }} className={currentPage == 4 && 'font-weight-bold bg-primary'} > Sign-in</Nav.Link> */}
          </Nav>
      
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Outlet></Outlet>
     {/* <Navbar bg="white" variant="white" >
       
        <Container>
          
          
            <Navbar.Brand href="#Logo" style={{ color: "black" }}> Logo</Navbar.Brand>
          
           
             
            <Nav className="nav-justify-content-end">
            <Nav.Link href="#Home" style={{ color: "black" }}> Home</Nav.Link>
            <Nav.Link href="#List your space" style={{ color: "black" }}> List you space</Nav.Link>
            <Nav.Link href="#Find a space" style={{ color: "black" }}> Find a space</Nav.Link>
             <Nav.Link href="#About Us" style={{ color: "black" }}> About Us</Nav.Link> 
              <Nav.Link href="#Sign-in" style={{ color: "black" }}> Sign-in</Nav.Link>
             
            </Nav>
          
          
           
        </Container>
      </Navbar>
        <Outlet></Outlet> */}
    
   </>
  )
}

export default Navigationbar