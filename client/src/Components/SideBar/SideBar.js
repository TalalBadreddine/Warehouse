import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


// TODO:add link from router-dom
function SideBar() {
  const navigate = useNavigate()

  const Logout = () => {
    axios.get('/logout').then((data) => {
      navigate('/')
    })
  }

const [state, setState] = React.useState({
     top: false,
     left: false,
     bottom: false,
     right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
   const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Manage' ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton variant="contained">
             <Link to={'/admin/'} className='d-flex' style={{textDecoration:'none', color: 'black'}} ><ManageAccountsIcon  style={{color:'#54d494',  minWidth: '50px'}}/> <ListItemText primary={text} /> </Link>
              
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

              <List>
        {['Dashboard' ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton variant="contained">
            <Link to={'/admin/dashboard/'} className='d-flex' style={{textDecoration:'none', color: 'black'}} >
              <DashboardIcon style={{color:'#54d494' , minWidth: '50px'}}/><ListItemText primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

            
                  <List>
        {['Requests' ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton variant="contained">
            <Link to={'/admin/requests'} className='d-flex' style={{textDecoration:'none', color: 'black'}} >
            <ArrowDownwardIcon style={{color:'#54d494' , minWidth: '50px'}}/>
              <ListItemText primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
               <List>
        {['User Activity' ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton variant="contained">
            <Link to={'/admin/userActivity/'} className='d-flex' style={{textDecoration:'none', color: 'black'}} >
              <AccessibilityIcon style={{color:'#54d494' , minWidth: '50px'}}/>
              <ListItemText primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
            



      <List>

          <ListItem disablePadding>
            <ListItemButton variant="contained">
              <LogoutIcon style={{color:'#54d494' , minWidth: '50px'}}/>
              <ListItemText primary={'Logout'}  onClick={(e) =>{
                e.preventDefault()
                Logout()
                } }/>
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div >
    <div>
       {[''].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button  style={{color:"#54d494", height:"60px", width:"60px"}} 
          startIcon={<KeyboardArrowRightIcon style={{fontSize:"40px"}}/>} 
          onClick={toggleDrawer(anchor, true)}>
             
            {anchor}

            </Button>
          
          
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
    {<Outlet></Outlet>}
    </div>
  )
}

export default SideBar