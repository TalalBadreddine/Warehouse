import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import styles from './NavigationCss.module.css'
import ui from '../../themes'
import Logo from '../../Assets/Logo.svg'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function Navigationbar({ role }) {
  const [currentPage, setCurrentPage] = useState(-1)
  const [userImage, setUserImage] = useState(null)
  const navigate = useNavigate()

  const findSpaceRoute = (role) => {
    if (role == 'visitor') {
      return '/findASpace'
    }

    if (role == 'customer') {
      return '/customer/'
    }

  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const logout = async () => {


    await axios.post('/userActivity', {
      action: `Logged out`,
      role: 'customer'
    }).then(async (results) => {
      await axios.get('/logout').then((data) => {
        navigate('/')
      })
    })
  }


  useEffect(() => {
    if (role == 'customer') {
      axios.get('/user/getCurrentUser').then((data) => {
        console.log(data)
        console.log('user')
        setUserImage(data.data.image)
      })
    }

    if (role == 'owner') {
      axios.get('/warehouseOwner/getProfile').then((data) => {
        console.log(data)
        setUserImage(data.data.image)
        console.log('owner')
      })
    }

  })

  const goToProfile = () =>{
    if(role == 'customer'){
      navigate('/customer/profile')
    }else{
      navigate('/owner/profile')
    }
  }

  const fontColor = 'white'

  //TODO: nav logout btn and change i ui
  return (
    <>


      <Navbar expand="lg" className={styles.navBar}>
        <Container fluid>
          <Navbar.Brand href="#Logo" style={{ color: fontColor }}><img src={Logo} width='50px' height='45px' style={{ color: 'white' }} ></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav></Nav>
            <Nav
              className="justify-content-end "
              style={{ width: "100%" }}
              navbarScroll
            >



              {/* VISITOR */}
              {role == 'visitor' && <Nav.Link  className=' mt-2'> <Link  to={''} style={{ color: fontColor, textDecoration: 'none' }} className={'px-1'} > Home </Link> </Nav.Link>}

              {/* CUSTOMER AND VISITOR */}
              {(role == 'visitor' || role == 'customer') && <Nav.Link className=' mt-2'> <Link to={findSpaceRoute(role)} style={{ color: fontColor, textDecoration: 'none' }} className={'px-1'} > Find a space </Link> </Nav.Link>}

              {role == 'visitor' && <Nav.Link  className=' mt-2'> <Link to={'/aboutUs'} style={{ color: fontColor, textDecoration: 'none' }} className={'px-1'} > About us </Link> </Nav.Link>}
              {role == 'visitor' && <Nav.Link  className=' mt-2'> <Link to={'/login'} style={{ color: fontColor, textDecoration: 'none' }} className={`px-3 py-2 rounded-4  ${styles.loginBtn}`} > Sign-in </Link> </Nav.Link>}

              {/* CUSTOMER */}
              {role == 'customer' && <Nav.Link  className=' mt-2'> <Link to={'/customer/requests'} style={{ color: fontColor, textDecoration: 'none' }} className={'px-1'} > My Requests </Link> </Nav.Link>}


              {/* OWNER */}
              {role == 'owner' && <Nav.Link  className=' mt-2'> <Link to={'/owner/myWarehouses'} style={{ color: fontColor, textDecoration: 'none' }} className={'px-1'} > My Warehouses </Link> </Nav.Link>}
              {role == 'owner' && <Nav.Link  className=' mt-2'> <Link to={'/owner/warehouseRequests'} style={{ color: fontColor, textDecoration: 'none' }} className={'px-1'} > Warehouse Requests </Link> </Nav.Link>}


              {/* CUSTOMER AND OWNER*/}
              {/* <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div >
                {(role == 'owner' || role == 'customer') && <Nav.Link className={styles.navItem} className='py-2 px-2'><p style={{color:`${ui.normalText}`}}   >Profile</p></Nav.Link>}
              </div>
              </Popover> */}
              {(role == 'owner' || role == 'customer') && <Nav.Link className='py-2 px-2 mt-2'><p style={{color:`${ui.normalText}`}}  className={styles.navItem}  onClick={() => { logout() }}  >Logout</p></Nav.Link>}
              {(role == 'owner' || role == 'customer') && userImage != null && <Nav.Link ><img src={`${userImage}`} width='40px' height='40px' className={styles.imageIcon} style={{ borderRadius: '100%' }} onClick={() => {goToProfile()}}></img></Nav.Link>}


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