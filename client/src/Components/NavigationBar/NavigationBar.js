import axios from 'axios';
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import styles from './NavigationCss.module.css'


function Navigationbar({ role }) {
  const [currentPage, setCurrentPage] = useState(-1)
  const navigate = useNavigate()

  const findSpaceRoute = (role) => {
    if (role == 'visitor') {
      return '/findASpace'
    }

    if (role == 'customer') {
      return '/customer/'
    }

  }

  const logout = () => {
    axios.get('/logout').then((data) => {
      navigate('/')
    })
  }

  const fontColor = 'black'

  //TODO: nav logout btn and change i ui
  return (
    <>


      <Navbar bg="white" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#Logo"  style={{ color: fontColor }}>Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav></Nav>
            <Nav
              className="justify-content-end "
              style={{ width: "100%" }}
              navbarScroll
            >



              {/* VISITOR */}
              {role == 'visitor' && <Nav.Link> <Link to={''} style={{ color: fontColor, textDecoration: 'none' }} className={'px-1'} > Home </Link> </Nav.Link>}

              {/* CUSTOMER AND VISITOR */}
              {(role == 'visitor' || role == 'customer') && <Nav.Link> <Link to={findSpaceRoute(role)} style={{ color: fontColor, textDecoration: 'none' }} className={'px-1'} > Find a space </Link> </Nav.Link>}

              {role == 'visitor' && <Nav.Link> <Link to={'/aboutUs'} style={{ color: fontColor, textDecoration: 'none' }} className={'px-1'} > About us </Link> </Nav.Link>}
              {role == 'visitor' && <Nav.Link> <Link to={'/login'} style={{ color: fontColor, textDecoration: 'none' }} className={`px-3 py-2 rounded-4  ${styles.loginBtn}`} > Sign-in </Link> </Nav.Link>}

              {/* CUSTOMER */}
              {role == 'customer' && <Nav.Link> <Link to={'/customer/requests'} style={{ color: fontColor, textDecoration: 'none' }} className={'px-1'} > My Requests </Link> </Nav.Link>}


              {/* OWNER */}
              {role == 'owner' && <Nav.Link> <Link to={'/owner/myWarehouses'} style={{ color: fontColor, textDecoration: 'none' }} className={'px-1'} > My Warehouses </Link> </Nav.Link>}
              {role == 'owner' && <Nav.Link> <Link to={'/owner/warehouseRequests'} style={{ color: fontColor, textDecoration: 'none' }} className={'px-1'} > Warehouse Requests </Link> </Nav.Link>}


              {/* CUSTOMER AND OWNER*/}
              {(role == 'owner' || role == 'customer') && <Nav.Link><p onClick={() => { logout() }} >Logout</p></Nav.Link>}

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